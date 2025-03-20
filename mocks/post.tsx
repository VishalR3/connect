import { faker } from "@faker-js/faker";
const posts = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: i,
    author: faker.person.fullName().split(" ").join("").toLocaleLowerCase(),
    avatar: faker.image.avatar(),
    caption: faker.lorem.sentence(),
    image: faker.image.urlPicsumPhotos({
      height: 300,
      width: 300,
    }),
    likes: faker.number.int({ min: 1, max: 100 }),
    comments: faker.number.int({ min: 1, max: 100 }),
    timestamp: faker.date.past(),
  }));

export type Post = (typeof posts)[number];

export default posts;
