const { Mongoose } = require('mongoose');
const { Student } = require('../models/student.js')
const { errorResponse } = require('../utils/genericsResponses.js')

/*getStudents get the complete list of students (firstname and lastname)*/
const getStudents = (req, res) => {
    const { limit, offset } = req.query;

    Student.aggregate([{$project: 
                        {fullName: 
                        {$concat: ["$firstName"," ","$lastName"]}}}]).limit(parseInt(limit)).skip(parseInt(offset))
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>{        
        res.json(errorResponse('GET//getStudents', err.message, res.statusCode));
    })
}

/*getStudentsDetails get the complete detail of a student */
const getStudentsDetails = (req, res) => {
    const { id } = req.params
    Student.findById(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        //res.status(400).json({message: err.message});
        res.json(errorResponse('GET//getStudentsDetails', err.message, res.statusCode));
    })
}

/*createStudent create a new student into 'students' collection */
const createStudent = (req, res) => {
    const { FirstName, LastName, BirthDate, Email, Addres, Gender } = req.body

    const reqBody = new Student({
        firstName: FirstName,
        lastName: LastName,
        birthDate: BirthDate,
        email: Email,
        addres: Addres,
        gender: Gender
    });

    reqBody.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            //res.status(400).json({message: err.message})
            res.json(errorResponse('POST//createStudent', err.message, res.statusCode));
        });
}

/*updateStudent update an existing student into 'students' collection */
const updateStudent = (req, res) => {
    const {id, FirstName, LastName, BirthDate, Email, Addres, Gender } = req.body

    const reqBody = {
        firstName: FirstName,
        lastName: LastName,
        birthDate: BirthDate,
        email: Email,
        addres: Addres,
        gender: Gender
    };

    Student.findByIdAndUpdate(id,reqBody)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            //res.status(400).json({message: err.message})
            res.json(errorResponse('PUT//updateStudent', err.message, res.statusCode));
        });        

}

/*deleteStudent delete an existing student into 'students' collection */
const deleteStudent = (req, res) => {
    const {id} = req.params
    Student.findById(id)
        .then((data) => {
            if(data){
                Student.deleteOne({_id: id})
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch((err) => {
                        res.status(400).json({message: err.message})
                    })
            }else{
                res.json(errorResponse('DELETE//deleteStudent', 'No data found in the students collection', res.statusCode));
            }

        })
        .catch(() => {
            //res.status(404).json({message: "NO_DATA_FOUND"})
            res.json(errorResponse('DELETE//deleteStudent', err.message, res.statusCode));
        })
}

/*getTotalDocuments Get the count of all documents in student collection*/
const getTotalDocuments = (req, res) => {
    Student.count()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.json(errorResponse('DELETE//deleteStudent',err.message, res.statusCode));
        })
}




exports.getStudents = getStudents;
exports.getStudentsDetails = getStudentsDetails;
exports.createStudent = createStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getTotalDocuments = getTotalDocuments;