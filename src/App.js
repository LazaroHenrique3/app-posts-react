import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Edit from './pages/Edit/Edit';
import Feed from './pages/Feed/Feed';
import Post from './pages/Post/Post';
import ReadMore from './pages/ReadMore/ReadMore';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/post" element={<Post />} />
        <Route path="/readmore/:id" element={<ReadMore />} />
      </Routes>
    </Router>
  );
}

export default App;
