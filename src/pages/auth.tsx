import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import FacebookIcon from '../../public/assets/svg/facebook.svg'

const Auth = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const isCheckAuth = () => {
      const currentUser: { username: string } = JSON.parse(sessionStorage.getItem('user') as string)
      if (currentUser?.username) {
        router.push('/')
      }
    }
    isCheckAuth()
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await axios.post('https://long-ruby-earthworm-veil.cyclic.app/api/v1/users', data)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      router.push('/')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Stack display={'flex'} alignItems={'center'}>
      <Box position={'fixed'} top={0} left={0} right={0}>
        {loading && <LinearProgress />}
      </Box>
      <Box width={'30vw'} sx={{ width: { xs: '90vw', sm: '70vw', md: '50vw', lg: '30vw' } }}>
        <Box textAlign={'center'}>
          <Image src={FacebookIcon} alt="icon" height={80} />
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                variant="filled"
                error={Boolean(errors?.username?.message?.toString())}
                fullWidth
                size="small"
                placeholder="Email address or phone number"
                helperText={
                  errors?.username?.message?.toString() ? errors?.username?.message?.toString() : ''
                }
                {...register('username', { required: 'Required !' })}
              />
            </Box>
            <Box mt={4}>
              <TextField
                variant="filled"
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
                  errors?.password?.message?.toString() ? errors?.password?.message?.toString() : ''
                }
                {...register('password', { required: 'Required !' })}
              />
            </Box>
            <Box mt={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                type={loading ? 'button' : 'submit'}
              >
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  <Typography fontWeight={'bold'} fontSize={18}>
                    Log in
                  </Typography>
                )}
              </Button>
            </Box>
          </form>
          <Box textAlign={'center'} mt={4}>
            <Typography color={'primary'} fontSize={14}>
              Forget Password ?
            </Typography>
          </Box>
          <Box display={'flex'} gap={4} mt={4} alignItems={'center'}>
            <Box borderBottom={'1px solid #ccd0d5'} flex={1} />
            <Typography fontSize={14}>Or</Typography>
            <Box borderBottom={'1px solid #ccd0d5'} flex={1} />
          </Box>
          <Box textAlign={'center'} mt={4}>
            <Button variant="outlined" sx={{ width: '50%' }}>
              Create new account
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ width: { xs: '96vw', sm: '76vw', md: '56vw', lg: '36vw' } }}
        mt={16}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Stack alignItems={'center'}>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            English (UK)
          </Typography>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            한국어
          </Typography>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            Português (Brasil)
          </Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            中文(台灣)
          </Typography>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            Español
          </Typography>
          <Typography color={'#576b95'} fontSize={12} mt={1}>
            Français (France)
          </Typography>
        </Stack>
      </Box>
      <Box mt={8} textAlign={'center'}>
        <Typography color={'#8a8d91'} fontSize={12} mt={1}>
          Introduce · Help · More
        </Typography>
        <Typography color={'#8a8d91'} fontSize={12} mt={1}>
          Meta © 2023
        </Typography>
      </Box>
    </Stack>
  )
}

export default Auth
