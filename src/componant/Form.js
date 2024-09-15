import React from 'react';

const Form = ({ submitHandler, name, setName, email, setEmail, phone, setPhone, isUpdate }) => {
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input 
                    type="tel" 
                    className="form-control" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                {isUpdate ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default Form;
