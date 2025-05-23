const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
};

const create = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: err.message };
  }
};

const update = async (formData, petId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: err.message };
  }
};

const deletePet = async (petId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: err.message };
  }
};

export {
    index,
    create,
    update,
    deletePet,
};