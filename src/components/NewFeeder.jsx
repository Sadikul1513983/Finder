/* eslint-disable react/prop-types */
import "../styles/output.css";
import thumb from "../assets/thumb.png"
import { getTime } from "../assets/utils";



const NewFeeder = (props) => {

   const {rowDto,loading}=props

  let dataForLanding = rowDto?.articles || rowDto?.result

  return (
    <div>
      <main className="my-24 lg:my-14">
        <div className="container mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 grid grid-cols-12 gap-6 self-start xl:col-span-8">
            <div className="col-span-12 grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4">
                {loading && (
                  <h1 >
                    <b>Loading...</b>
                  </h1>
                )}
                {dataForLanding?.length > 0 &&
                  dataForLanding?.map((item) => {
                    return (
                      <div key={item?.title}> 
                        <a href="#">
                          <h3 className="mb-2.5 text-2xl font-bold lg:text-[28px]">
                            {item?.url ||  "N/A"}
                          </h3>
                        </a>
                        <hr style={{margin:"5px"}} />
                        <p className="text-base text-[#5C5955]">
                          {item?.title ||  "N/A"}
                        </p>
                        <hr style={{margin:"5px"}} />
                        <p className="text-base text-[#5C5955]">
                          {item?.description ||  "N/A"}
                        </p>
                        <hr style={{margin:"5px"}} />
                        <div className="col-span-12 lg:col-span-8">
                          <img
                            className="w-full"
                            src={item?.urlToImage || thumb}
                            alt="N/A"
                          />
                          <hr style={{margin:"5px"}} />
                          <p className="mt-5 text-base text-[#5C5955]">
                            {item?.author ||  "N/A"}
                          </p>
                          <hr style={{margin:"5px"}} />
                          <p className="mt-5 text-base text-[#5C5955]">
                            {`${getTime(item?.publishedAt)}-${item?.source?.name}`}
                          </p>
                          <hr style={{margin:"5px 0px 15px 0px",width:"200%",border:"2px solid black"}} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewFeeder;
