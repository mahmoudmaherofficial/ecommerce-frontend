import { useEffect, useState } from 'react';
import TableView from '../../../Components/Dashboard/Table';
import { Axios } from '../../../Api/axios';
import { CategoriesUrl, CategoryUrl } from '../../../Api/Api';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import Swal from 'sweetalert2';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);

  const [loading, setLoading] = useState(false);
  // Header
  const header = [
    {
      key: 'title',
      name: 'title',
    },
    {
      key: 'image',
      name: 'image',
    },
    {
      key:'created_at',
      name:'created',
    },
    {
      key:'updated_at',
      name:'updated',
    }
  ];
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CategoriesUrl}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, page]);

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'steelblue',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${CategoryUrl}/${categoryId}`)
          .then(() => {
            setCategories(categories.filter((category) => category.id !== categoryId));
            Swal.fire({
              title: 'Deleted!',
              text: 'Category has been deleted.',
              confirmButtonColor: 'steelblue',
              icon: 'success',
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'An error occurred!',
              text: 'Category has not been deleted.',
              icon: 'error',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="page">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="page-title">Categories</h1>
          <Link to="/dashboard/category/add" className="btn add-btn">
            Add Category
          </Link>
        </div>
        <TableView
          limit={limit}
          setLimit={setLimit}
          total={total}
          setPage={setPage}
          header={header}
          body={categories}
          delete={handleDelete}
          isLoading={loading}
          search={'title'}
          searchLink={CategoryUrl}
        />
      </div>
    </>
  );
}
