const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const Complaint=require('./db/complaints')
const User = require('./db/user');
const cors = require('cors');

//Middleware for parsing JSON
app.use(express.json());

//Enable CORS
app.use(cors())

//Registration
app.post('/Signin',async(req,res) => {
    try{ 
        const {email,password} = req.body;
        console.log(req.body)
        const user = new User({email,password});
        await user.save();
        res.status(201).json({message:'Registration Successful'});
    }
    catch(error){
        res.status(500).json({error:'Registration failed'});
    }
})

//Login
app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email, 'password:', password);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or Password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/complaints', async (req, res) => {
    try {
      const { selectedLab, complaintText, supervisorView, LabNumber, DepartmentName } = req.body;
      const newComplaint = new Complaint({
        selectedLab,
        complaintText,
        supervisorView,
        LabNumber,
        DepartmentName,
      });
      await newComplaint.save();
      res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/api/complaints', async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.json(complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.put('/api/complaints/:complaintId', async (req, res) => {
    try {
      const { complaintId } = req.params;
      const { status } = req.body;
  
      // Update the complaint with the provided ID
      const updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { status },
        { new: true } // This option ensures that the updated complaint is returned
      );
  
      if (!updatedComplaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
  
      res.json(updatedComplaint);
    } catch (error) {
      console.error('Error updating complaint status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

connectDB();

app.listen(port,()=> {
 console.log('Server is listening on Post 8000')
});