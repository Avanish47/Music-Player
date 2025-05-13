import { useState } from 'react';

function MusicPlayer() {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [newSong, setNewSong] = useState('');
  const [jumpIndex, setJumpIndex] = useState('');

  const addSongToPlaylist = () => {
    if (newSong.trim() === '') return;
    setPlaylist(prev => {
      const updated = [...prev, newSong.trim()];
      if (currentIndex === -1) setCurrentIndex(0);
      return updated;
    });
    setNewSong('');
  };

  const playNextSong = () => {
    setCurrentIndex(prev =>
      prev < playlist.length - 1 ? prev + 1 : prev
    );
  };

  const playPreviousSong = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const jumpToSong = () => {
    const index = parseInt(jumpIndex);
    if (!isNaN(index) && index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
    } else {
      alert('Invalid index');
    }
    setJumpIndex('');
  };

  const getCurrentSong = () => {
    if (playlist.length === 0 || currentIndex === -1) {
      return 'No song is currently playing.';
    }
    return playlist[currentIndex];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">🎵 Music Player</h1>

        {/* Add Song */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter song title"
            value={newSong}
            onChange={(e) => setNewSong(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addSongToPlaylist}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>

        {/* Current Song Display */}
        <div className="mb-4">
          <strong>Now Playing:</strong>
          <p className="text-gray-700">{getCurrentSong()}</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between mb-4">
          <button
            onClick={playPreviousSong}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            ⏮ Prev
          </button>
          <button
            onClick={playNextSong}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Next ⏭
          </button>
        </div>

        {/* Jump to Song */}
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Index"
            value={jumpIndex}
            onChange={(e) => setJumpIndex(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={jumpToSong}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Jump
          </button>
        </div>

        {/* Playlist Display */}
        <div>
          <h2 className="font-semibold mb-2">Playlist:</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {playlist.map((song, index) => (
              <li
                key={index}
                className={index === currentIndex ? 'font-bold text-indigo-600' : ''}
              >
                {index}. {song}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
