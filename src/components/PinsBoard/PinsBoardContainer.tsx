import PinsBoard from "./PinsBoard";

const PinsBoardContainer = () => {
  const pins = [
    {
      id: "392592935175833",
      title: "Manager type put above.",
      imageURL:
        "https://i.pinimg.com/236x/9a/58/f8/9a58f85bcaf04879554ef211eeec287b.jpg",
      authorDisplayName: "John Doe",
    },
    {
      id: "369169980854002",
      title: "Or factor on culture.",
      imageURL:
        "https://i.pinimg.com/236x/08/b6/ba/08b6bad6564b5167bc6011a1c117c72d.jpg",
      authorDisplayName: "Jane Doe",
    },
  ];

  return <PinsBoard pins={pins} />;
};

export default PinsBoardContainer;
