import Layout from '@/components/layout'
import { Box, Button, Dialog, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PopUpIcon from '../../public/assets/svg/popup-icon.svg'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const Home = () => {
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(
    null,
  )
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [isPlay, setIsPlay] = useState(true)
  const handleStop = (time: number) => {
    if (time > 20 && !currentUser) {
      setIsPlay(false)
      setIsOpenPopup(true)
    }
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') as string)
    setCurrentUser(user)
  }, [])

  return (
    <Box>
      <Layout>
        <Box px={5}>
          <ReactPlayer
            url={
              'https://www.apornvideo.com/mp4/902/slutty-german-lands-two-cocks-in-her-ass.mp4?a=1'
            }
            loop={true}
            playing={isPlay}
            width={'100%'}
            height={'auto'}
            onProgress={(data) => handleStop(data.playedSeconds)}
            controls
            muted={true}
          />
          <Typography color="white" mt={4} fontSize={20} fontWeight={700}>
            Teenie Melody Mark fucked well by stepbro while she teaches him to fuck hard{' '}
          </Typography>
        </Box>
      </Layout>

      {/* POPUP */}
      <Dialog open={isOpenPopup}>
        <Stack
          width={'25vw'}
          minWidth={'250px'}
          justifyContent={'center'}
          alignItems={'center'}
          py={4}
        >
          <Image src={PopUpIcon} alt="icon" />
          <Typography variant="h4" mt={4}>
            Login to view continue !
          </Typography>
          <Box mt={4}>
            <Button variant="contained" fullWidth href="/auth">
              Login
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </Box>
  )
}

export default Home
