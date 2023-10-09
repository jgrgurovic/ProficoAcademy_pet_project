const admin = require("firebase-admin")
const fs = require("fs")

const serviceAccount = require("../serviceAccountKey.json")
const localUserData = JSON.parse(fs.readFileSync("../src/db.json", "utf8"))

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://truecrime-6f10f-default-rtdb.europe-west1.firebasedatabase.app",
}

admin.initializeApp(firebaseConfig)

const db = admin.database()
const usersRef = db.ref("data/users")

if (Array.isArray(localUserData.users)) {
  localUserData.users.forEach((user: any) => {
    const userRef = usersRef.child(user.id)
    userRef.set({
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
    })
  })

  console.log("Users pushed to Firebase.")
} else {
  console.error(
    "localUserData.users is not an array. Check the JSON data structure."
  )
}

usersRef
  .once("value", (snapshot: any) => {
    const usersData = snapshot.val()
    console.log("Users data:", usersData)
  })
  .catch((error: any) => {
    console.error("Error fetching users data:", error)
  })
