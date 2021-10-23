import {
    GlobalOutlined,
	TeamOutlined,
	GiftOutlined,
    AppstoreOutlined,
    ProfileOutlined, 
    SmileOutlined,
} from '@ant-design/icons';

const menuList = [
 	{
 		title: '首页', // 菜单标题名称
		key: '/home', // 对应的path
		icon: <GlobalOutlined/>, // 图标名称
		isPublic: true, // 公开的
	},
	{
		title: '用户管理',
		key: '/user',
		icon: <TeamOutlined />
	},
	{
		title: '商品',
		key: '/products',
		icon: <GiftOutlined />,
		children: [ // 子菜单列表
			{
				title: '品类管理',
				key: '/category',
				icon: <AppstoreOutlined />
			},
			// {
			// 	title: '商品管理',
			// 	key: '/product',
			// 	icon: <ProfileOutlined />
			// },
		]
	},
	// {
	// 	title: '角色管理',
	// 	key: '/role',
	// 	icon: <SmileOutlined />,
	// },
]

export default menuList