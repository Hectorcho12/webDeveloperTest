const express = require('express');
const { getStudents, getStudentsDetails, createStudent, updateStudent, deleteStudent, getTotalDocuments } = require('../handlers/student.js')

const router = express.Router();

/*GET methods*/
router.get('/getStudents', (res,req) => getStudents(res,req) )
router.get('/getStudentsDetails/:id', (req, res) => getStudentsDetails(req,res))
router.get('/getTotalDocuments/', (req, res) => getTotalDocuments(req,res))

/*POST methods*/
router.post('/createStudent', (req, res) => createStudent(req,res))

/*PUT methods*/
router.put('/updateStudent', (req, res) => updateStudent(req,res))

/*DELETE methods*/
router.delete('/deleteStudent/:id', (req, res) => deleteStudent(req,res))


module.exports = router;