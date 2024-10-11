const Music = ({ audioRef }: any) => {
  const backgroundMusicUrl = "/song/song.mp3";
  return (
    <>
      <audio ref={audioRef} src={backgroundMusicUrl} loop hidden />
    </>
  );
};
export default Music;
