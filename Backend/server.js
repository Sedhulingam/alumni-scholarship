import express from 'express';
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"scholarship"
})

app.get('/',(re,res)=>{
    return res.json("From Backend Side");
})


app.get('/alumini', (req, res) => {
    const sql = 'SELECT * FROM alumini';
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });


  app.post('/alumini/bulk', (req, res) => {
    const sql =
      'INSERT INTO alumini ( Reg_no, Name, Programme, Degree, Branch, Semester, Father_Name, Mother_Name, Tenth_Mark, Twelveth_Mark, Diploma, Gender, Physically_challenged, Mobile_No, Personal_Mail_id, Address, First_Graduate, Scholarship_Availed, Scholarship_Name, Scholarship_Amount, GCT_mail_id, Annual_Income, Aadhar_no, gpa1, gpa2, gpa3, gpa4, gpa5, gpa6, gpa7, gpa8, Cgpa, Attendance) VALUES ? ON DUPLICATE KEY UPDATE Name=VALUES(Name), Programme=VALUES(Programme), Degree=VALUES(Degree), Branch=VALUES(Branch), Semester=VALUES(Semester), Father_Name=VALUES(Father_Name), Mother_Name=VALUES(Mother_Name), Tenth_Mark=VALUES(Tenth_Mark), Twelveth_Mark=VALUES(Twelveth_Mark), Diploma=VALUES(Diploma), Gender=VALUES(Gender), Physically_challenged=VALUES(Physically_challenged), Mobile_No=VALUES(Mobile_No), Personal_Mail_id=VALUES(Personal_Mail_id), Address=VALUES(Address), First_Graduate=VALUES(First_Graduate), Scholarship_Availed=VALUES(Scholarship_Availed), Scholarship_Name=VALUES(Scholarship_Name), Scholarship_Amount=VALUES(Scholarship_Amount), GCT_mail_id=VALUES(GCT_mail_id), Annual_Income=VALUES(Annual_Income), Aadhar_no=VALUES(Aadhar_no), gpa1=VALUES(gpa1), gpa2=VALUES(gpa2), gpa3=VALUES(gpa3), gpa4=VALUES(gpa4), gpa5=VALUES(gpa5), gpa6=VALUES(gpa6), gpa7=VALUES(gpa7), gpa8=VALUES(gpa8), Cgpa=VALUES(Cgpa), Attendance=VALUES(Attendance)';
  
    const values = req.body.map((item) => [
      
      item.Reg_no,
      item.Name,
      item.Programme,
      item.Degree,
      item.Branch,
      item.Semester,
      item.Father_Name,
      item.Mother_Name,
      item.tenth_Mark,
      item.twelveth_Mark,
      item.Diploma,
      item.Gender,
      item.Physically_challenged,
      item.Mobile_No,
      item.Personal_Mail_id,
      item.Address,
      item.First_Graduate,
      item.Scholarship_Availed,
      item.Scholarship_Name,
      item.Scholarship_Amount,
      item.GCT_mail_id,
      item.Annual_Income,
      item.Aadhar_no,
      item.gpa1,
      item.gpa2,
      item.gpa3,
      item.gpa4,
      item.gpa5,
      item.gpa6,
      item.gpa7,
      item.gpa8,
      item.Cgpa,
      item.Attendance,
    ]);
  
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting/updating bulk data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ success: true, result });
    });
  });
   

app.get('/alumini',(req,res)=>{
    const sql = "SELECT * FROM alumini";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

// ... (your existing code)
app.get('/api/sem1/:regno', (req, res) => {
  const regno = req.params.regno;


  // Execute the SQL query
  const query = `SELECT * FROM sem1 WHERE Reg_no = ?`;
  db.query(query, [regno], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


// app.get('/alumini/:regNo/details', (req, res) => {
//   const regNo = req.params.regNo;
//   const sql = 'SELECT * FROM sem1 WHERE Reg_no = ?';

//   db.query(sql, [regNo], (err, data) => {
//     if (err) {
//       console.error('Error fetching record details:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (data.length === 0) {
//       return res.status(404).json({ error: 'Record not found' });
//     }

//     // Assuming you want to send only the first matching record details
//     const recordDetails = data[0];

//     return res.status(200).json(recordDetails);
//   });
// });

// ... (your existing code)


app.post('/alumini',(req,res)=>{
    const sql = "INSERT INTO alumini (Reg_no,Name,Programme,Degree,Branch,Semester,Father_Name,Mother_Name,tenth_Mark,twelveth_Mark,Diploma,Gender,Physically_challenged,Mobile_No,Personal_Mail_id,Address,First_Graduate,Scholarship_Availed,Scholarship_Name,Scholarship_Amount,GCT_mail_id,Annual_Income,Aadhar_no,gpa1,gpa2,gpa3,gpa4,gpa5,gpa6,gpa7,gpa8,Cgpa,Attendance) VALUES (?)";
    const values =[
        
        req.body.Reg_No,
        req.body.Name,
        req.body.Programme,
        req.body.Degree,
        req.body.Branch,
        req.body.Current_Semester,
        req.body.Father_Name,
        req.body.Mother_Name,
        req.body.Tenth_Mark,
        req.body.Twelveth_Mark,
        req.body.Diploma,
        req.body.Gender,
        req.body.Physically_Challenged,
        req.body.Mobile_No,
        req.body.Personal_Mail_Id,
        req.body.Address,
        req.body.First_Graduate,
        req.body.Scholarship_Availed,
        req.body.Scholarship_Name,
        req.body.Scholarship_Amount,
        req.body.GCT_Mail_Id,
        req.body.Annual_Income,
        req.body.Aadhar_No,
        req.body.gpa1,
        req.body.gpa2,
        req.body.gpa3,
        req.body.gpa4,
        req.body.gpa5,
        req.body.gpa6,
        req.body.gpa7,
        req.body.gpa8,
        req.body.Cgpa,
        req.body.Attendance
    ]
    db.query(sql,[values],(err,result)=> {
        if(err) return res.json(err);
        return res.json(result);
    });
})

// app.put('/alumini/:recordId', (req, res) => {
//   let recordId = req.params.recordId; // recordId is initially a string

//   // Convert recordId to a number (integer)
//   recordId = parseInt(recordId, 10);
  

//   // Rest of your code...
//   const sql = `
//     UPDATE alumini
//     SET   Name=?, Programme=?, Degree=?, Branch=?, Semester=?, Father_Name=?,
//     Mother_Name=?, tenth_Mark=?, twelveth_Mark=?, Diploma=?, Gender=?, Physically_challenged=?,
//     Mobile_No=?, Personal_Mail_id=?, Address=?, First_Graduate=?, Scholarship_Availed=?,
//     Scholarship_Name=?, Scholarship_Amount=?, GCT_mail_id=?, Annual_Income=?, Aadhar_no=?,
//     gpa1=?, gpa2=?, gpa3=?, gpa4=?, gpa5=?, gpa6=?, gpa7=?, gpa8=?, Cgpa=?, Attendance=?
//     WHERE Reg_no=?
//   `;
//   const values = [
    
//     req.body.Name,
//     req.body.Programme,
//     req.body.Degree,
//     req.body.Branch,
//     req.body.Semester,
//     req.body.Father_Name,
//     req.body.Mother_Name,
//     req.body.tenth_Mark,
//     req.body.twelveth_Mark,
//     req.body.Diploma,
//     req.body.Gender,
//     req.body.Physically_challenged,
//     req.body.Mobile_No,
//     req.body.Personal_Mail_id,
//     req.body.Address,
//     req.body.First_Graduate,
//     req.body.Scholarship_Availed,
//     req.body.Scholarship_Name,
//     req.body.Scholarship_Amount,
//     req.body.GCT_mail_id,
//     req.body.Annual_Income,
//     req.body.Aadhar_no,
//     req.body.gpa1,
//     req.body.gpa2,
//     req.body.gpa3,
//     req.body.gpa4,
//     req.body.gpa5,
//     req.body.gpa6,
//     req.body.gpa7,
//     req.body.gpa8,
//     req.body.Cgpa,
//     req.body.Attendance,
//     recordId
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// });
app.put('/alumini/:recordId', (req, res) => {
  let recordId = req.params.recordId; // recordId is initially a string

  // Convert recordId to a number (integer)
  recordId = parseInt(recordId, 10);
  

  // Rest of your code...
  const sql = `
    UPDATE alumini
    SET   Name=?, Programme=?, Degree=?, Branch=?, Semester=?, Father_Name=?,
    Mother_Name=?, tenth_Mark=?, twelveth_Mark=?, Diploma=?, Gender=?, Physically_challenged=?,
    Mobile_No=?, Personal_Mail_id=?, Address=?, First_Graduate=?, Scholarship_Availed=?,
    Scholarship_Name=?, Scholarship_Amount=?, GCT_mail_id=?, Annual_Income=?, Aadhar_no=?,
    gpa1=?, gpa2=?, gpa3=?, gpa4=?, gpa5=?, gpa6=?, gpa7=?, gpa8=?, Cgpa=?, Attendance=?
    WHERE Reg_no=?
`;

const updateValues = [
  req.body.Name,
    req.body.Programme,
    req.body.Degree,
    req.body.Branch,
    req.body.Semester,
    req.body.Father_Name,
    req.body.Mother_Name,
    req.body.tenth_Mark,
    req.body.twelveth_Mark,
    req.body.Diploma,
    req.body.Gender,
    req.body.Physically_challenged,
    req.body.Mobile_No,
    req.body.Personal_Mail_id,
    req.body.Address,
    req.body.First_Graduate,
    req.body.Scholarship_Availed,
    req.body.Scholarship_Name,
    req.body.Scholarship_Amount,
    req.body.GCT_mail_id,
    req.body.Annual_Income,
    req.body.Aadhar_no,
    req.body.gpa1,
    req.body.gpa2,
    req.body.gpa3,
    req.body.gpa4,
    req.body.gpa5,
    req.body.gpa6,
    req.body.gpa7,
    req.body.gpa8,
    req.body.Cgpa,
    req.body.Attendance,
    recordId

  // ... (your update values)
];
  
  const conditionValue = recordId;

const values = [...updateValues, conditionValue];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});





app.delete('/alumini/:regNo', (req, res) => {
  const regNo = req.params.regNo;
  const sql = 'DELETE FROM alumini WHERE Reg_no = ?';

  db.query(sql, [regNo], (err, result) => {
      if (err) {
          console.error('Error deleting record:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Record not found' });
      }

      return res.status(200).json({ success: true, result });
  });
});

app.get('/alumini/:regNo', (req, res) => {
  const regNo = req.params.regNo;
  const sql = 'SELECT * FROM alumini WHERE Reg_no = ?';

  db.query(sql, [regNo], (err, data) => {
    if (err) {
      console.error('Error fetching record:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Assuming you want to send only the first matching record
    const record = data[0];

    return res.status(200).json(record);
  });
});






app.listen(8081,()=>{
    console.log('listening');
})