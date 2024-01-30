import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
function News() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, settotalPage] = useState(1)
  const [pageCondition, setpageCondition] = useState(true)
  const [uiMode, setuiMode] = useState("Dark")
  const [displayedText, setDisplayedText] = useState("");
  

  const pageSize = 10;
  const fetchData = async () => {
    const data = await fetch(`https://newsapi.org/v2/everything?q=${search}&pageSize=${pageSize}&page=${page}from=2023-12-22&sortBy=publishedAt&apiKey=a2f5490a01a04f2bae9868f80096f2f4`)
    const response = await data.json()
    setData(response.articles)
    settotalPage(Math.ceil(response.totalResults / pageSize))
  }
  console.log(totalPage)
  useEffect(() => {

    const text = "News Update";

    const intervalId = setInterval(() => {
      const currentLength = displayedText.length;

      if (currentLength < text.length) {
        setDisplayedText(text.substring(0, currentLength + 1));
      } else {
        setDisplayedText(":)");
      }
    }, 500);

    //=================================================
    if (page > 1) {
      setpageCondition(false)
    }
    if (page === 1) {
      setpageCondition(true)
    }
    fetchData()
    //took fetchData out of useEffect can't access  it until it is inside the useEffect
    return () => clearInterval(intervalId);


  },[displayedText,page])


  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  const handleNext = (e) => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  const handlePrev = (e) => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleChanges = (currentPage) => {
    setPage(currentPage);
  }

  //This is to handle the nnumber of buttons at the bottom 
  const buttonRender = () => {
    const pagenavigationButton = [];
    for (let i = 0; i <= 10; i++) {
      pagenavigationButton.push(
        <button className="navBar" onClick={() => handleChanges(i)}>{i}</button>
      )
    }
    return pagenavigationButton;
  }

  const modeHandler = () => {
    if (uiMode === "Dark") {
      
      setuiMode("Light")

    }
    else {
      setuiMode("Dark")
    }
  }
  return (
    <>

      <div className='master'>
        <div className='Header'>{displayedText}</div>

        <div className='app'>
          <form className="searchPart" onSubmit={handleSubmit}>

            <input className="input" placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className='searchbtn'>Search</button>
          </form>

          <div >
            <button className="modeBtn" onClick={() => { modeHandler() }} >{uiMode} Mode</button>
          </div>
          <div className='main'>
            <div className='container'>
              {data ? (
                <>
                  <ul>
                    {data.map((item, index) => (
                      <Newsitem
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.urlToImage}
                        url={item.url}
                      />
                    ))}
                  </ul>
                  <button className='prevBtn' onClick={handlePrev} disabled={pageCondition}>Prev</button>
                  {buttonRender()}
                  <button className='nextBtn' onClick={handleNext}>Next</button>



                </>
              ) : (
                <>
                  <p style={{ fontWeight: "bold", textAlign: "centre" }}>No news articles found</p>

                </>
              )}


            </div>
          </div>
        </div>

      </div>
      <div className='Footer'>
        <h3 className='Footer1'>Made with </h3>
        <p><span style={{ fontSize: '400%', color: 'red' }}>&hearts;</span>:)</p>
        <h3 className='Footer2'>By Aryaman</h3>
      </div>


    </>
  )
}

export default News