import { Box, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillCameraVideoFill, BsList } from 'react-icons/bs'
import { CgMediaLive } from 'react-icons/cg'
import { RiSettings4Fill } from 'react-icons/ri'

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
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100vw',
  cursor: 'pointer',
  zIndex: 100,
}))

const SideBarMenuItem = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.9)',
  padding: '14px 18px',
  borderBottom: '1px solid white',
  fontSize: 14,
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const SideBarMenuPc = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  zIndex: 100,
  left: 0,
  width: 250,
  background: 'black',
  cursor: 'ponter',
  boxShadow: '0 0 50px -10px #000',
}))

const SideBarMenuItemPc = styled(Box)(({ theme }) => ({
  padding: '10px ',
  fontSize: 14,
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const Header = () => {
  const router = useRouter()
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState<boolean>(false)
  const [isOpenMenuPc, setIsOpenMenuPc] = useState<boolean>(false)

  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(
    null,
  )

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') as string)
    setCurrentUser(user)
  }, [])

  return (
    <>
      <Box>
        <Box
          bgcolor={'black'}
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
        </Box>
        <Box
          bgcolor={'black'}
          sx={{ display: { xs: 'flex', lg: 'none' } }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box display={'flex'} alignItems={'center'} gap={4}>
            <Box
              sx={{ display: { lg: 'none', xs: 'flex' } }}
              p={1}
              bgcolor={'rgba(255,255,255,.2)'}
              borderRadius={1}
              alignItems={'center'}
              onClick={() => setIsOpenMenuMobile(!isOpenMenuMobile)}
              position={'relative'}
            >
              <BsList color="white" fontSize={30} />
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
      </Box>
    </>
  )
}

export default Header
