import React,{useEffect, useState} from 'react'

function DataFromSQL() {

    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:19006/api/get-items')
            const nbaData = await response.json()
            const newData = nbaData.result.map(({ ID, Title, Price, Description }) => ({
                ID,
                Title,
                Price,
                Description
            }));
            setPlayerData(newData);
            console.log(nbaData);
            
        }
        fetchData()
    }, [])
    
    return (
        <div className="App">
            <div className="container">
                {Array.isArray(playerData.result) ? playerData.result.map((item) => (
                    <div className="item" key={item.ID}>
                        <ol >
                            <div>
                                {item.UserID},
                            </div>
                            <div>
                                Full_Name: {item.Tenant},
                            </div>
                            <div>
                                User_Description: {item.Description}
                            </div>
                        </ol>
                    </div>
                )) : null}
            </div>
        </div>
    )
}

export default DataFromSQL