const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.get('/', async (req, res, next) => {
  try {

    const studSnapshot = await fadmin.firestore().collection('students').get();
      const eventSnapshot = await fadmin.firestore().collection('events').get();
      const registrationData = [];
      const categoryData = [];

      studSnapshot.forEach((doc) => {
        const userData = doc.data();
        const userDateData = doc.data().registrationDate;

        if (userData && userDateData) {            

            if (!registrationData[userDateData]) {
                registrationData[userDateData] = {
                    totalUsers: 1,
                    registrationDate: new Date(userDateData).toISOString().split('T')[0],
                };
            } else {
                registrationData[userDateData].totalUsers += 1;
            }

        }   
      });

      eventSnapshot.forEach((doc) => {
        const eventCategory = doc.data().category;

        if (eventCategory) {
          if (!categoryData[eventCategory]) {
            categoryData[eventCategory] = 1;
          } else {
            categoryData[eventCategory] += 1;
          }
        }
        
      });

      const registrationArray = Object.values(registrationData);
      const categoryArray = Object.entries(categoryData).map(([category, count]) => ({ category, count }));

      res.json({ 
        registrationData: registrationArray,
        categoryData: categoryArray,
      });

  } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;