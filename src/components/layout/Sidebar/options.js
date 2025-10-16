import ArticleIcon from '@mui/icons-material/Article';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People'; // ✅ added

const options = [
  { label: 'Blogs', icon: ArticleIcon, path: '/blogs' },
  { label: 'Musics', icon: MusicNoteIcon, path: '/musics' },
  { label: 'Albums', icon: AlbumIcon, path: '/albums' },
  { label: 'Posts', icon: PostAddIcon, path: '/posts' },
  { label: 'Users', icon: PeopleIcon, path: '/users' }, // ✅ new item
];

export default options;
