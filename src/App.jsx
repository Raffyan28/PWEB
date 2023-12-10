import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './styles/styles.css';

const App = () => {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/api.php');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = ({ nama, npm, kelas }) => {
    if (editItemId !== null) {
      // Update data jika sedang dalam mode edit
      const updatedData = data.map((item) =>
        item.id === editItemId ? { ...item, nama, npm, kelas } : item
      );
      setData(updatedData);
      setEditItemId(null);
    } else {
      // Tambah data baru jika tidak dalam mode edit
      setData([...data, { id: Date.now(), nama, npm, kelas }]);
    }
  };  

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost/api.php?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error deleting data');
      }
  
      // Update state setelah berhasil menghapus
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };
  const editData = (id) => {
    // Set data yang akan diubah ke form
    setEditItemId(id);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Input Data Mahasiswa</h1>
      <Form addData={addData} editItemId={editItemId} setEditItemId={setEditItemId} data={data} />
      <List data={data} deleteData={deleteData} editData={editData} />
    </div>
  );
};

export default App;