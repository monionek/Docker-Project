'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface TokenPayload {
  id: string;
  username: string;
  role: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const decoded = jwtDecode<TokenPayload>(token);

    if (decoded.role !== 'admin') {
      router.push('/unauthorized');
      return;
    }

    fetchUsers(token);
  }, []);

const fetchUsers = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(data.users);
    setUsers(data.users);
    setIsLoading(false);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};


  const deleteUser = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      console.log(id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert('Nie udało się usunąć użytkownika.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Ładowanie użytkowników...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Panel administratora</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rola</th>
            <th className="p-2 border">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
