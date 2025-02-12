import { useState } from "react";

const NoteView = () => {
  const [title, setTitle] = useState("a random note");

  return (
    <div className="flex flex-col bg-stone-800 w-full h-full p-10">
      <div className="w-full flex flex-row border">
        <div>{title}</div>
        <div>options</div>
      </div>
      <div>
        <div>calender icon</div>
        <div>date</div>
        <div>current date</div>
      </div>
      <hr />
      <div>
        <div>calender icon</div>
        <div>date</div>
        <div>current date</div>
      </div>
      <div>Lorem ipsum dolor sit amet consectetur.
      Explicabo ad rerum consequatur praesentium nostrum?
      In itaque minus quos officiis explicabo.
      Quam sint nesciunt quaerat nobis aliquid!
      Culpa fugit porro facilis voluptas vel?
      Nulla maxime quo ducimus esse dolor.
      Aut reiciendis perspiciatis laboriosam dolores animi.
      Quam doloribus a soluta quod pariatur?
      Fugit, voluptatibus consequatur? Commodi, eius doloribus.
      Sequi cum perspiciatis tenetur neque rem!</div>
    </div>
  );
};

export default NoteView;
