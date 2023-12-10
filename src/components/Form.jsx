import React, { useState, useEffect } from 'react';

const Form = ({ addData, editItemId, setEditItemId, data }) => {
  const [input, setInput] = useState({ nama: '', npm: '', kelas: '' });

  useEffect(() => {
    // Mengisi formulir dengan data item yang akan diubah saat mode edit diaktifkan
    if (editItemId !== null) {
      const itemToEdit = data.find((item) => item.id === editItemId);
      if (itemToEdit) {
        setInput({ nama: itemToEdit.nama, npm: itemToEdit.npm, kelas: itemToEdit.kelas });
      }
    }
  }, [editItemId, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItemId !== null) {
      // Update data jika sedang dalam mode edit
      addData(input);
      setEditItemId(null);
    } else {
      // Tambah data baru jika tidak dalam mode edit
      addData(input);
    }
    setInput({ nama: '', npm: '', kelas: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nama:
          <input
            type="text"
            value={input.nama}
            onChange={(e) => setInput({ ...input, nama: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          NPM:
          <input
            type="text"
            value={input.npm}
            onChange={(e) => setInput({ ...input, npm: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Kelas:
          <input
            type="text"
            value={input.kelas}
            onChange={(e) => setInput({ ...input, kelas: e.target.value })}
          />
        </label>
      </div>
      <div>
        <button type="submit">{editItemId !== null ? 'Update' : 'Tambah'}</button>
      </div>
    </form>
  );
};

export default Form;