import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CategoriesUrl } from '../../Api/Api';
import { Axios } from '../../Api/axios';
import PaginatedItems from './Pagination';
import ConvertDate from '../../Services/ConvertDate';

export default function TableView(props) {
  // Handling props
  const {
    header,
    body,
    currentUser: currentUserProp,
    isLoading,
    delete: deleteProp,
    setPage,
    limit,
    setLimit,
    total,
    search: searchProp,
    searchLink,
  } = props;

  // current user
  const currentUser = currentUserProp || { id: '' };

  // Handling Search
  const [search, setSearch] = useState('');
  const [filteredBody, setFilteredBody] = useState([]);
  const [searching, setSearching] = useState(false);

  // Handling Date filter
  const [dateFilter, setDateFilter] = useState('');
  const filteredBodyByDate =
    dateFilter.length !== 0 ? body.filter((item) => ConvertDate(item.created_at) === ConvertDate(dateFilter)) : body;
  const filteredSearch =
    dateFilter.length !== 0
      ? filteredBody.filter((item) => ConvertDate(item.created_at) === ConvertDate(dateFilter))
      : filteredBody;  

  const searchQuery = search.length > 0 ? filteredSearch : filteredBodyByDate;

  const handleSearch = async () => {
    try {
      const res = await Axios.post(`${searchLink}/search?${searchProp}=${search}`);
      setFilteredBody(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      search.length > 0 ? handleSearch() : setSearching(false);
    }, 500);
    return () => {
      clearTimeout(searchDelay);
    };
  }, [search]);

  // Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios.get(`${CategoriesUrl}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Header
  const tableHeader = header.map((th, idx) => <th key={idx}>{th.name}</th>);

  // Body
  const tableBody = searchQuery.map((item, idx) => (
    <tr key={idx}>
      {/* <td>{idx + 1}</td> */}
      <td>{item.id}</td>
      {header.map((column, idx) => {
        const value = item[column.key];
        let displayValue = value;

        switch (column.key) {
          case 'image':
            displayValue = <img src={value} alt={value} style={{ width: '50px' }} />;
            break;
          case 'role':
            const roles = {
              1995: 'admin',
              1996: 'moderator',
              1999: 'product manager',
              2001: 'user',
            };
            displayValue = roles[value] || value;
            break;
          default:
            break;
        }

        if (currentUser && displayValue === currentUser.name && column.key === 'name') {
          displayValue += ' (You)';
        }

        if (column.key === 'category') {
          const category = categories.find((cat) => cat.id === value);
          displayValue = category ? category.title : value;
        }

        if (column.key === 'created_at' || column.key === 'updated_at') {
          // displayValue = new Date(value).toLocaleString();
          displayValue = ConvertDate(value);
        }

        if (column.key === 'images') {
          displayValue = item.images.map((img, idx) => (
            <img key={idx} src={img.image} alt={img.image} style={{ width: '40px' }} />
          ));
        }

        return (
          <td className="text-center" key={idx}>
            {displayValue}
          </td>
        );
      })}
      <td>
        <div className="actions">
          <Link to={`${item.id}`} className="btn btn-outline-success" title="Edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          {item.id !== currentUser.id && (
            <button onClick={() => deleteProp(item.id)} className="btn btn-outline-danger" title="Delete">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </td>
    </tr>
  ));

  // Warning row
  const warningRow = (warningText) => {
    return (
      <tr>
        <td colSpan={header.length + 2} className="text-center text-secondary">
          {warningText}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="table-header d-flex justify-content-between gap-2 align-items-center mb-2">
        <div className="col col-md-4">
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearching(true);
            }}
          />
        </div>
        <div className="col col-md-2">
          <Form.Control
            type="date"
            placeholder="filter by date"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSearching(true);
            }}
          />
        </div>
      </div>
      <Table responsive className="table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {tableHeader}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? warningRow('Loading...')
            : search && searching
            ? warningRow('Searching...')
            : !body.length || (search && !filteredBody.length)
            ? warningRow('No items found')
            : tableBody}
        </tbody>
      </Table>
      <div className="pagination-panel d-flex justify-content-between align-items-center">
        <Form.Select onChange={(e) => setLimit(e.target.value)} style={{ width: '70px' }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
        <PaginatedItems total={search.length > 0 ? 1 : total} itemsPerPage={limit} data={body} setPage={setPage} />
      </div>
    </>
  );
}
