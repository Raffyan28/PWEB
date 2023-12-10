import React from 'react';

const List = ({ data, deleteData, editData }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Nama</th>
          <th>NPM</th>
          <th>Kelas</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.nama}</td>
            <td>{item.npm}</td>
            <td>{item.kelas}</td>
            <td>
              <button onClick={() => deleteData(item.id)}>Hapus</button>
              <button onClick={() => editData(item.id)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;