import { faker } from "@faker-js/faker";
const poll = {
  id: faker.database.mongodbObjectId(),
  author: faker.person.fullName().split(" ").join("").toLocaleLowerCase(),
  avatar: faker.image.avatar(),
  caption: faker.lorem.sentence(),

  timestamp: faker.date.past(),
};

export type Poll = typeof poll;

export default poll;
