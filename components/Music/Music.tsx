const Music = ({ audioRef }: any) => {
  const backgroundMusicUrl =
    "https://ia803204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3";
  return <audio ref={audioRef} src={backgroundMusicUrl} loop hidden />;
};
export default Music;
