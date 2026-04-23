import { useState } from 'react'
import Header from './components/header';
import { IconA,IconB } from './components/icon.jsx'
import Image from './components/image.jsx';
import Checkbox from './components/checkbox.jsx';
import Counter from './components/counter.jsx';
import Video from './components/video';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Header />
      <IconA />
      <br />
      Hello World
      <hr />
      <IconB />
      <Image imageUrl="https://picsum.photos/200/300" />
      <hr />

      <Checkbox text="coding react" isChecked={false} />
      <Checkbox text="doing document react" isChecked={true} />
      <Checkbox text="test react" isChecked={false} />

      <Counter />

      <hr />
      <Video 
      isPlaying={isPlaying}
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      style={{ width: '70%', height: 'auto' , display: 'block', margin: '0 auto' }}
      />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default App