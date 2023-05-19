import { Box, Stack, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillCameraVideoFill, BsList, BsSearch } from 'react-icons/bs'
import { CgMediaLive } from 'react-icons/cg'
import { RiSettings4Fill } from 'react-icons/ri'

const TopHeader = styled(Box)(({ theme }) => ({
  background: ' rgba(0,0,102,.9)',
  backgroundSize: 'auto 100%',
  display: 'flex',
  justifyContent: 'space-between',
  height: 72,
  padding: 7,
  '& img': {
    display: 'block',
    height: 58,
    width: 'min-content',
    objectFit: 'contain',
    [theme.breakpoints.down('lg')]: {
      height: 40,
    },
  },
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const InputSearch = styled('input')(({ theme }) => ({
  outline: 'none',
  border: 'none',
  width: 260,
  padding: '5px 7px',
  fontSize: 17,
  background: '#004be8',
  color: '#fff',
  height: 'auto',
}))

const ButtonCustom = styled('button')(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#004be8',
  borderColor: '#004be8',
}))

const SettingItem = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all .1s ease',
  '& img': {
    display: 'block',
    height: 16,
  },
  '&:hover': {
    '& p': {
      color: '#ffda00',
    },
  },
}))

const MenuHeader = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all .1s ease',
  '& .gold_button': {
    backgroundColor: '#ffda00',
    backgroundImage: 'linear-gradient(to bottom,#fcfce0 0,#fcdf62 45%,#f3b72f 55%,#b87418 100%)',
    color: '#271700',
    fontWeight: 700,
    textShadow:
      '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5), 1px -1px 0 rgba(255,255,255,.5), -1px 1px 0 rgba(255,255,255,.5)',
  },
}))

const ItemHeader = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: 14,
  padding: '4px 10px',
  textTransform: 'uppercase',
  transition: 'all .1s ease',
  '&:hover': {
    borderBottom: '2px solid #fff',
    color: '#ffda00',
  },
}))

const SideBarMenu = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 70,
  zIndex: 100,
  left: 0,
  right: 0,
  cursor: 'pointer',
}))

const SideBarMenuItem = styled(Box)(({ theme }) => ({
  background: 'rgba(0,75,232,.9)',
  padding: '14px 18px',
  borderBottom: '1px solid #000090',
  fontSize: 14,
}))

const SideBarMenuPc = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  zIndex: 100,
  left: 0,
  width: 250,
  background: '#000090',
  cursor: 'ponter',
  boxShadow: '0 0 50px -10px #000',
}))

const SideBarMenuItemPc = styled(Box)(({ theme }) => ({
  padding: '10px ',
  fontSize: 14,
  '&:hover': {
    background: '#004be8',
  },
}))

const Header = () => {
  const router = useRouter()
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState<boolean>(false)
  const [isOpenMenuPc, setIsOpenMenuPc] = useState<boolean>(false)

  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(
    null,
  )
  const logOut = () => {
    sessionStorage.clear()
    setCurrentUser(null)
    router.push('/')
  }
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') as string)
    setCurrentUser(user)
  }, [])

  return (
    <>
      <Box>
        <TopHeader>
          <Box
            sx={{ display: { lg: 'none', xs: 'flex' } }}
            p={1}
            bgcolor={'rgba(255,255,255,.2)'}
            borderRadius={1}
            alignItems={'center'}
            onClick={() => setIsOpenMenuMobile(!isOpenMenuMobile)}
          >
            <BsList color="white" fontSize={30} />
          </Box>
          <Box
            display={'flex'}
            gap={5}
            sx={{
              flexDirection: { xs: 'column', lg: 'row' },
              gap: {
                xs: 1,
                lg: 5,
              },
              padding: {
                lg: 5,
              },
            }}
            alignItems={'center'}
          >
            <Typography fontSize={40} color={'red'} fontWeight={700}>
              XNVIEOS.CLICK
            </Typography>
            {/* <Image src={Logo} alt="logo" /> */}
            <Typography
              color={'white'}
              fontSize={12}
              sx={{
                display: { lg: 'none' },
              }}
            >
              Your free Porn Video is now loading... :-)
            </Typography>
            <Stack gap={1} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography color={'white'} fontSize={12}>
                {'Your free Porn Video is now loading... :-)'}
              </Typography>
              <Box display={'flex'} alignItems={'stretch'} gap={1}>
                <InputSearch placeholder="Search ..." />
                <ButtonCustom>Search</ButtonCustom>
              </Box>
            </Stack>
          </Box>
          {/* <Box gap={8} alignItems={'flex-start'} sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <SettingItem>
              <Typography color="white" fontSize={14}>
                Language
              </Typography>
              <Image src={UkIcon} alt="uk-icon" />
            </SettingItem>
            <SettingItem>
              <Typography color="white" fontSize={14}>
                Content
              </Typography>
              <Image src={UkIcon} alt="uk-icon" />
            </SettingItem>
          </Box> */}
          <Box
            sx={{ display: { lg: 'none', xs: 'flex' } }}
            p={2}
            bgcolor={'rgba(255,255,255,.2)'}
            alignItems={'center'}
            borderRadius={1}
          >
            <BsSearch color="white" fontSize={24} />
          </Box>
        </TopHeader>
        <Box
          bgcolor={'#004be8'}
          justifyContent={'space-between'}
          px={4}
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          <MenuHeader>
            <Box
              display={'flex'}
              alignItems={'center'}
              bgcolor={'rgba(255,255,255,.2)'}
              p={1}
              position={'relative'}
              onClick={() => setIsOpenMenuPc(!isOpenMenuPc)}
            >
              <BsList color="white" fontSize={28} />
              {isOpenMenuPc && (
                <SideBarMenuPc sx={{ display: { xs: 'none', lg: 'block' } }}>
                  <SideBarMenuItemPc color={'white'}>Arab / Arabian</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Japan wife</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Big Ass</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Stepmon and son</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Japanese family</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Milf</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Tamil</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Female Ejaculation</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Tami Sex</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Creampie</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Indian Sex</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Bangladeshi</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Big Tits</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Big Cock</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Tamil aunty</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Latina</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Femdom</SideBarMenuItemPc>
                  <SideBarMenuItemPc color={'white'}>Hardcore</SideBarMenuItemPc>
                </SideBarMenuPc>
              )}
            </Box>
            <ItemHeader>BEST OF </ItemHeader>
            <ItemHeader>HITS </ItemHeader>
            <ItemHeader>TAGS </ItemHeader>
            <ItemHeader>PICTURES </ItemHeader>
            <ItemHeader>LIVE CAMS </ItemHeader>
            <ItemHeader>SEX STORIES </ItemHeader>
            <ItemHeader>FORUM</ItemHeader>
            <ItemHeader>PORNSTARS </ItemHeader>
            <ItemHeader>GAMES </ItemHeader>
            <ItemHeader className="gold_button">GOLD </ItemHeader>
          </MenuHeader>
          {/* <Box display={'flex'} alignItems={'center'} gap={4}>
            {currentUser ? (
              <>
                <Typography variant="h5" fontWeight={'bold'} color={'white'}>
                  {currentUser?.username}
                </Typography>

                <Button variant="text" onClick={logOut}>
                  <Typography color="white"> Log out</Typography>
                </Button>
              </>
            ) : (
              <Button variant="text" href="/auth" size="small">
                <Typography color="white">Sign In</Typography>
              </Button>
            )}
          </Box> */}
        </Box>
        <Box
          bgcolor={'rgba(0,0,102,.9)'}
          sx={{ display: { xs: 'flex', lg: 'none' } }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'center'} gap={4}>
            <Box
              px={2}
              py={2}
              fontWeight={'bold'}
              sx={{
                backgroundImage:
                  'linear-gradient(to bottom,#fcfce0 0,#fcdf62 45%,#f3b72f 55%,#b87418 100%)',
              }}
            >
              GOLD
            </Box>
            <BsFillCameraVideoFill color="white" fontSize={30} />
            <CgMediaLive color="white" fontSize={18} />
          </Box>

          <Box>
            <RiSettings4Fill color="white" fontSize={30} />
          </Box>
        </Box>
        {isOpenMenuMobile && (
          <SideBarMenu sx={{ display: { lg: 'none' } }}>
            <SideBarMenuItem color={'white'}>HISTORY</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>BEST OF</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>HIT</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>TAGS</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>PICTURES</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>LIVE CAMS</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>SEX STORIES</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>FORUM</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>PRONSTARTS</SideBarMenuItem>
            <SideBarMenuItem color={'white'}>GAMES</SideBarMenuItem>
          </SideBarMenu>
        )}
      </Box>
    </>
  )
}

export default Header
