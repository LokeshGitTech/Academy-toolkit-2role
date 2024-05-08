/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './card';
import Header from './Header';
import Modal from './modal';
import Modal2 from './Modal2';


const Home = () => {

    const  role  = useSelector(state => state.auth.currantUser.role)
    const  course  = useSelector(state => state.courses)
    const [modal , setModel] = useState(false)
    const [editCourseData, setEditCourseData] = useState(null); 
    const [modal2, setModal2] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
      setDeleteId(id); 
      setModal2(true);
    };

    const handleEdit = e => {
      const editCourseData = course.courses.find(p => p.id === e)
      setEditCourseData(editCourseData);
      setModel(true);
  };

    const handleModal = ()=> {
      setModel(true)
    }

    const closeModal = () => {
      setModel(false)
      setModal2(false)
      setDeleteId(null)
    }

  return (
    <div>
        {role === "Teacher" ? 
        <div>
          <Header handleModal={handleModal}/>
          <h1>Teacher</h1>
         <div className='px-5 py-8 flex justify-between flex-wrap gap-10'>
           {course.courses.map((e)=> 
          <Card role={role} key={e.id} title={e.title} description={e.description} image={e.image} id={e.id} onDelete={handleDelete} onEdit={handleEdit}/>
        )} 
         </div>
         {modal && <Modal closeModal={closeModal} editCourseData={editCourseData}/>}
         {modal2 && <Modal2 id={deleteId} closeModal={closeModal}/>} 
        </div>
        : 
        <div>
          <Header />
          <h1>Student</h1>
          <div className='px-5 py-8 flex justify-between flex-wrap gap-10'>
           {course.courses.map((e)=> 
              <Card role={role} key={e.id} title={e.title} description={e.description} image={e.image} id={e.id} onDelete={handleDelete} onEdit={handleEdit} subscribe={e.subscribe}/>
            )} 
          </div>
        </div>
        }
    </div>
  )
}

export default Home