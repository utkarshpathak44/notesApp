const Restore: React.FC = () => {
  const fileName = "A nowhere trip";
  return (
    <div className="w-full h-full">
      <img src="./src.assets/noteHuge.svg" alt="" />
      <h2>Restore "{fileName}"</h2>
      <p>
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <button className="px-5 py-3 bg-blue-700">Restore</button>
    </div>
  );
};
