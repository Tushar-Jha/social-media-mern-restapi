import React from 'react'
import "./profile.css"
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import axios from 'axios'
import {useParams} from 'react-router'
function Profile() {
    const [user, setUser] = React.useState({})
    const params=useParams();
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    React.useEffect(() => {
        const fecthUser = async () => {
            const res = await axios.get(`/users/?username=${params.username}`);
            console.log(res.data);
            setUser(res.data)
        }
        fecthUser();
    }, [params.username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" src={user.coverPicture ?  PF+ user.coverPicture : PF+ "persons/download.jpg"} alt="" />
                            <img className="profileUserImage" src={user.profilePicture ? PF+user.profilePicture : PF+"persons/nodp.jpg"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile