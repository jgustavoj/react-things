import express, { Request, Response } from "express";

const router = express.Router();
const users = [
  {
    name: "Jorn",
    id: 0,
  },
  {
    name: "Markus",
    id: 3,
  },
  {
    name: "Andrew",
    id: 2,
  },
  {
    name: "Ori",
    id: 4,
  },
  {
    name: "Mike",
    id: 1,
  },
];

// Get next ID
const getNextId = (arr: any) => {
  let id: any = [];
  users.forEach((item) => {
    id.push(item.id);
  });
  return Math.max.apply(null, id) + 1;
};

// Filter ID
const idToFilter = (req: Request) => (user: any) =>
  user.id === parseInt(req.params.id);

// Get all users
router.get("/", (req: Request, res: Response) => {
  res.send(users);
});

// Get one user
router.get("/:id", (req: Request, res: Response) => {
  let found = users.some(idToFilter(req));
  if (found) {
    res.json(users.filter(idToFilter(req)));
  } else {
    res.status(400).json({ msg: "Did not find user" });
  }
});

// Create user
router.post("/", (req: Request, res: Response) => {
  const newMember = {
    ...req.body,
    id: getNextId(users),
  };

  if (!newMember.name) {
    return res.status(400).json({ msg: "Please include name in your request" });
  }
  users.push(newMember);
  res.json(users);
});

// Update user
router.put("/:id", (req: Request, res: Response) => {
  const found = users.some(idToFilter(req));

  if (found) {
    const userToUpdate = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        if (userToUpdate.name === "") {
          res.status(400).json({ msg: "Users name can't be an empty value" });
        } else {
          user.name = userToUpdate.name ? userToUpdate.name : user.name;
          res.json({ msg: "Member updated", user });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "No user with that id number" });
  }
});

// Delete user
router.delete("/:id", (req: Request, res: Response) => {
  const found = users.some(idToFilter(req));
  if (found) {
    res.json(users.filter((user) => !idToFilter(req)(user)));
  } else {
    res.status(400).json({ msg: "No user with that Id number" });
  }
});

export default router;
