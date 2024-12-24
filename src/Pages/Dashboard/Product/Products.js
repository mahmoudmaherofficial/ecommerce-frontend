import { useEffect, useState } from 'react';
import TableView from '../../../Components/Dashboard/Table';
import { Axios } from '../../../Api/axios';
import { ProductsUrl, ProductUrl } from '../../../Api/Api';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  // Header
  const header = [
    {
      key: 'category',
      name: 'category',
    },
    {
      key: 'images',
      name: 'images',
    },
    {
      key: 'title',
      name: 'title',
    },
    {
      key: 'description',
      name: 'description',
    },
    {
      key: 'stock',
      name: 'stock',
    },
    {
      key: 'price',
      name: 'price',
    },
    {
      key: 'discount',
      name: 'discount',
    },
    {
      key: 'created_at',
      name: 'created',
    },
    {
      key: 'updated_at',
      name: 'updated',
    },
    // {
    //   key: "rating",
    //   name: "rating",
    // },
  ];
  useEffect(() => {
    setLoading(true);
    Axios.get(`${ProductsUrl}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, page]);

  const handleDelete = (productId) => {
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
        Axios.delete(`${ProductUrl}/${productId}`)
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been deleted.',
              showConfirmButton: false,
              icon: 'success',
              timer: 1000,
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'An error occurred!',
              text: 'Product has not been deleted.',
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
          <h1 className="page-title">Products</h1>
          <Link to="/dashboard/product/add" className="btn add-btn">
            Add product
          </Link>
        </div>
        <TableView
          limit={limit}
          setLimit={setLimit}
          total={total}
          setPage={setPage}
          header={header}
          body={products}
          delete={handleDelete}
          isLoading={loading}
          search={'title'}
          searchLink={ProductUrl}
        />
      </div>
    </>
  );
}
