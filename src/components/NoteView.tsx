import { useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { ToastContainer, toast } from "react-toastify";

const data = `
Lorem ipsum dolor sit amet consectetur. Explicabo ad rerum consequatur
        praesentium nostrum? In itaque minus quos officiis explicabo. Quam sint
        nesciunt quaerat nobis aliquid! Culpa fugit porro facilis voluptas vel?
        Nulla maxime quo ducimus esse dolor. Aut reiciendis perspiciatis
        laboriosam dolores animi. Quam doloribus a soluta quod pariatur? Fugit,
        voluptatibus consequatur? Commo
        
di, eius doloribus. Sequi cum perspiciatis tenetur neque rem!

        Lorem ipsum dolor sit amet. Ipsa suscipit nostrum natus reprehenderit!
        Exercitationem quisquam voluptatibus nostrum illum. Eveniet, eos
        mollitia. Autem, ad! Ab maxime id voluptas distinctio? Reprehenderit,
        dignissimos porro? Placeat, velit. Cupiditate error nobis impedit quas.
        Suscipit temporibus modi expedita vel. Natus maxime ea voluptatum fugit?
        Quasi magni cupiditate suscipit rem.

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        dignissimos animi modi sunt, quam beatae sapiente! Asperiores possimus
        similique fugit numquam ut. Numquam, ut.

                Lorem ipsum dolor sit amet consectetur. Consectetur doloremque officiis
        labore dicta a? Ipsum laborum accusantium adipisci iure fugit? Maxime
        minima corrupti minus quibusdam accusamus. Optio unde laboriosam
        reiciendis nihil quia! Mollitia modi eligendi incidunt quaerat?
        Molestiae? Pariatur ducimus velit aliquid perferendis ab. Sint suscipit
        ex quae placeat deleniti! Nobis voluptatibus in accusantium obcaecati
        quia! Fuga earum voluptas dolorem omnis assumenda? Asperiores laudantium
        quia magnam esse veritatis! Voluptas possimus odio omnis laboriosam hic?
        Veritatis explicabo beatae aliquid dolorem nam.

`;

const NoteView = () => {
  const [title, setTitle] = useState("a random note");
  const [textData, setTextData] = useState(data);

  const setAndNotifyData = (someData: string) => {
    setTextData(someData);
    toast("file saved");
  };

  return (
    <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 gap-8 ">
      <div className="w-full flex flex-row  justify-between text-4xl ">
        <div>{title}</div>
        <div className=" flex border border-stone-400 rounded-4xl w-10 h-10 items-center justify-center gap-1">
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          <div>
            <img src="./src/assets/calender.svg" alt="" />
          </div>
          <div className="text-[#999999]">Date</div>
          <div className="ml-10">current date</div>
        </div>
        <hr className="border-[#292929]" />
        <div className="flex flex-row gap-5">
          <div>
            <img src="./src/assets/otherFolder.svg" alt="" />
          </div>
          <div className="text-[#999999]">Folder</div>
          <div className="ml-10">Personal</div>
        </div>
      </div>
      <CustomTextArea text={textData} setAndNotifyData={setAndNotifyData} />
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        theme="dark"
      />
      <div className="flex flex-row  w-80 gap-2">
        <div className="flex border-t-2 border-l-2 border-r-2 border-b-4 border-[#555555]  text-[#555555] font-bold w-12 rounded-xl items-center justify-center">
          Ctrl
        </div>
        <div className="text-[#555555] font-bold">+</div>
        <div className="flex border-t-2 border-l-2 border-r-2 border-b-4 border-[#555555]  text-[#555555] font-bold w-9 rounded-xl items-center justify-center">
          S
        </div>
        <div className="text-[#555555] font-bold">to save the document</div>
      </div>
    </div>
  );
};

export default NoteView;
