import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Axios } from '../../../Api/axios';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import { UsersUrl, UserUrl } from '../../../Api/Api';
import TableView from '../../../Components/Dashboard/Table';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

export default function Users() {
  // Users
  const [users, setUsers] = useState([]);

  // current user id
  const [currentUser, setCurrentUser] = useState({});

  // Loading Screen Handling
  const [loading, setLoading] = useState(false);

  //Handle Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Axios.get(`${UserUrl}`).then((res) => {
      setCurrentUser(res.data);
    });
    setLoading(true);
    Axios.get(`${UsersUrl}?limit=${limit}&page=${page}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, page]);

  const handleUserDeletion = (userId) => {
    if (userId !== currentUser.id) {
      Swal.fire({
        title: 'Confirm deletion',
        text: 'This action is irreversible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'steelblue',
        confirmButtonText: 'Delete',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          Axios.delete(`${UserUrl}/${userId}`)
            .then(() => {
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
                confirmButtonColor: 'steelblue',
              });
            })
            .catch(() => {
              Swal.fire({
                title: 'Error',
                text: 'User could not be deleted.',
                icon: 'error',
              });
            })
            .finally(() => setLoading(false));
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'You cannot delete your own account while logged in.',
        icon: 'error',
        confirmButtonColor: 'steelblue',
      });
    }
  };

  // const usersList = users
  //   .sort((a, b) => {
  //     if (a.id === currentUser.id) return -1;
  //     if (b.id === currentUser.id) return 1;
  //     return 0;
  //   })
  //   // .filter((user) => user.id !== currentUserId) // filters the users to remove the current user from list
  //   .map((user, idx) => {
  //     return (
  //       <tr key={idx}>
  //         <td>{idx + 1}</td>
  //         <td>
  //           {user.name} {user.id === currentUser.id ? "(You)" : ""}
  //         </td>
  //         <td>{user.email}</td>
  //         <td>
  //           {user.role === "1995"
  //             ? "admin"
  //             : user.role === "1996"
  //             ? "moderator"
  //             : user.role === "1999"
  //             ? "Product Manager"
  //             : "user"}
  //         </td>
  //         <td>
  //           <div className="actions">
  //             <Link to={`${user.id}`} className="btn btn-outline-success" title="Edit">
  //               <FontAwesomeIcon icon={faPenToSquare} />
  //             </Link>
  //             {user.id !== currentUser.id && (
  //               <button onClick={() => handleDelete(user.id)} className="btn btn-outline-danger" title="Delete">
  //                 <FontAwesomeIcon icon={faTrash} />
  //               </button>
  //             )}
  //           </div>
  //         </td>
  //       </tr>
  //     );
  //   });

  const header = [
    {
      key: 'name',
      name: 'Username',
    },
    {
      key: 'email',
      name: 'E-mail',
    },
        {
      key:'created_at',
      name:'created',
    },
    {
      key:'updated_at',
      name:'Last Login',
    },
    {
      key: 'role',
      name: 'Role',
    },
  ];

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="page">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="page-title">Users</h1>
          <Link to="/dashboard/user/add" className="btn add-btn">
            Add User
          </Link>
        </div>
        <TableView
          limit={limit}
          setLimit={setLimit}
          total={total}
          setPage={setPage}
          header={header}
          body={users}
          delete={handleUserDeletion}
          currentUser={currentUser}
          isLoading={loading}
          search={'title'}
          searchLink={UserUrl}
        />
      </div>
    </>
  );
}
