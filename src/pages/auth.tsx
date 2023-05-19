import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  LinearProgress,
  Paper,
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
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
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

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(sessionStorage.getItem('user') as string)
      if (user) return router.push('/')
    }
    checkAuth()
  }, [router])

  return (
    <Stack bgcolor={'#f0f2f5'} minHeight={'100vh'} justifyContent={'center'} py={4}>
      {loading && (
        <Box position={'fixed'} top={0} left={0} right={0}>
          <LinearProgress />
        </Box>
      )}
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            <Box
              flex={1.5}
              display={'flex'}
              flexDirection={'column'}
              sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}
            >
              <Image src={FacebookIcon} alt="facebook" height={106} />
              <Box maxWidth={'70%'} mb={4} sx={{ paddingLeft: { md: '32px' } }}>
                <Typography sx={{ fontSize: { xs: 20, md: 30 } }}>
                  Facebook helps you connect and share with the people in your life.
                </Typography>
              </Box>
            </Box>
            <Box flex={1}>
              <Paper elevation={3}>
                <Box p={6}>
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
                  <Box mt={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      type={loading ? 'button' : 'submit'}
                    >
                      {loading ? (
                        <CircularProgress sx={{ color: 'white' }} size={24} />
                      ) : (
                        <Typography fontWeight={'bold'}>Log in</Typography>
                      )}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </form>
      </Container>
    </Stack>
  )
}

export default Auth
