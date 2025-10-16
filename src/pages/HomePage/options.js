import ArticleIcon from '@mui/icons-material/Article';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People'; // ✅ added

const options = [
  {
    label: 'Blogs',
    icon: ArticleIcon,
    color: '#1976d2',
    path: '/blogs',
  },
  {
    label: 'Musics',
    icon: MusicNoteIcon,
    color: '#d32f2f',
    path: '/musics',
  },
  {
    label: 'Albums',
    icon: AlbumIcon,
    color: '#388e3c',
    path: '/albums',
  },
  {
    label: 'Posts',
    icon: PostAddIcon,
    color: '#f57c00',
    path: '/posts',
  },
  {
    label: 'Users',
    icon: PeopleIcon,
    color: '#7b1fa2', // ✅ added distinctive purple tone
    path: '/users',
  },
];

export default options;
