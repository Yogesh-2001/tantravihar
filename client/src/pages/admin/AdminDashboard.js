import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Chart from "react-apexcharts";
import { Card } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileDetailsContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "branch", headerName: "Branch", width: 200 },
  { field: "companyName", headerName: "Company Placed", width: 300 },
  { field: "packagePlaced", headerName: "Package", width: 200 },
];

const AdminDashboard = () => {
  const { setLoading, allStudents } = useProfile();

  const [placed, setPlaced] = useState([]);
  const [rows, setRows] = useState([]);
  const [chart, setChart] = useState({});
  const [pieChartData, setPieChartData] = useState([]);
  const [studentsAbove9, setStudentsAbove9] = useState([]);
  const [obj, setObj] = useState({});

  useEffect(() => {
    const getAllPlaced = async () => {
      await axios
        .get("http://localhost:8080/api/v1/admin/all-placed-student")
        .then((res) => {
          setPlaced(res.data);
        });
    };
    getAllPlaced();
  }, []);

  useEffect(() => {
    const getRows = (data) => {
      const rows = [];
      data.forEach((placement) => {
        placement.placedStudentList.forEach((student) => {
          const { name, email } = student.user;
          const { branch } = student;
          const { companyName } = placement.driveId;
          const { packagePlaced } = placement;
          rows.push({
            id: `${name}-${packagePlaced}-${Math.random() * 100}`,
            name,
            branch,
            email,
            companyName,
            packagePlaced,
          });
        });
      });
      return rows;
    };

    setRows(getRows(placed));
  }, [placed]);

  useEffect(() => {
    const formatDataForChart = () => {
      const companyNames = [
        ...new Set(placed.map((placement) => placement.driveId.companyName)),
      ];
      const numOfStudentsPlaced = companyNames.map((companyName) => {
        const numOfStudents = placed
          .filter((placement) => placement.driveId.companyName === companyName)
          .reduce((acc, curr) => {
            return acc + curr.placedStudentList.length;
          }, 0);
        return { companyName, numOfStudents };
      });

      setChart(numOfStudentsPlaced);
    };
    formatDataForChart();
  }, [placed]);

  useEffect(() => {
    const formatDataForChart = () => {
      const branchCounts = {};
      placed.forEach((placement) => {
        placement.placedStudentList.forEach((student) => {
          const { branch } = student;
          if (branchCounts[branch]) {
            branchCounts[branch]++;
          } else {
            branchCounts[branch] = 1;
          }
        });
      });

      const labels = Object.keys(branchCounts);
      const series = labels.map((branch) => {
        const count = branchCounts[branch];
        return isNaN(count) ? 0 : count;
      });

      setPieChartData({ labels, series });
    };

    formatDataForChart();
  }, [placed]);

  useEffect(() => {
    const students = [];
    if (placed?.length > 0) {
      const filteredStudents = placed?.filter(
        (student) => student.packagePlaced >= 9
      );

      const studentDetails = filteredStudents.flatMap((student) => {
        return student.placedStudentList.map((placedStudent) => {
          return {
            name: placedStudent.user.name,
            packagePlaced: student.packagePlaced,
            photourl: placedStudent.photourl,
            branch: placedStudent.branch,
            companyName: student?.driveId.companyName,
          };
        });
      });

      setStudentsAbove9(studentDetails);
    }
  }, [placed]);

  const studentsByBranch = allStudents?.reduce((accumulator, student) => {
    const branch = student.branch;
    if (branch in accumulator) {
      accumulator[branch]++;
    } else {
      accumulator[branch] = 1;
    }
    return accumulator;
  }, {});
  const studentsByBranchPlaced = allStudents?.reduce((accumulator, student) => {
    if (student.placed) {
      const branch = student.branch;
      if (branch in accumulator) {
        accumulator[branch]++;
      } else {
        accumulator[branch] = 1;
      }
    }
    return accumulator;
  }, {});
  return (
    <>
      <h4 className="text-center">Bright Students of Vidyalankar</h4>
      <Card
        className="col-12 mx-auto my-4 p-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {studentsAbove9 && (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper py-3"
          >
            {studentsAbove9.map((student) => (
              <>
                <SwiperSlide
                  className="text-center py-3"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    borderRadius: "20px",
                    backgroundColor: "#e9ecefbf",
                  }}
                >
                  <img
                    style={{ width: "90%", borderRadius: "20px" }}
                    className="my-2"
                    src={`http://localhost:8080/uploads/profileimages/${student.photourl}`}
                  />
                  <h5 style={{ color: "#232379" }}>{student?.name}</h5>
                  <p className="mb-0">{student?.branch}</p>
                  <p className="mb-2">{student?.companyName}</p>
                  <h6>{student?.packagePlaced} LPA</h6>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        )}
      </Card>
      <h4 className="text-center mt-5">Placed Students Details</h4>
      <Card
        style={{
          height: 400,
          width: "100%",
          margin: "30px auto",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Card>
      <h4 className="text-center mt-5">Students Placed in Specific Company</h4>
      <Card
        style={{
          width: "100%",

          margin: " 30px auto",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        {placed.length > 0 && chart.length > 0 && (
          <Chart
            options={{
              colors: ["#3f51b5"],
              chart: {
                id: "placed-students-chart",
              },
              xaxis: {
                categories: chart && chart.map((item) => item.companyName),
              },
            }}
            series={[
              {
                name: "Number of Students Placed",
                data: chart && chart.map((item) => item.numOfStudents),
              },
            ]}
            type="bar"
            width="100%"
            height="500px"
          />
        )}
      </Card>
      <h4 className="text-center mt-5">Branch Specific Students Placed</h4>
      <Card
        className="d-flex justify-content-between flex-wrap py-5"
        style={{
          width: "100%",
          margin: "30px auto",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <section className="col-md-5 col-12">
          {placed.length > 0 && pieChartData && (
            <Chart
              options={{
                chart: {
                  id: "placed-students-chart",
                },
                labels: pieChartData.labels,
              }}
              series={pieChartData.series}
              type="donut"
              width="100%"
              height="400px"
            />
          )}
        </section>
        {allStudents.length > 0 && (
          <section className="branch-filters col-md-6 col-12 d-flex flex-wrap">
            <div className="col-md-5 mx-1 my-1 text-center">
              <h6>Computer Engineering</h6>
              <p>
                Students Registered :{" "}
                <b>{studentsByBranch["Computer Engineering"] || 0}</b>
              </p>
              <p>
                Students Placed :{" "}
                <b>{studentsByBranchPlaced["Computer Engineering"] || 0}</b>
              </p>
            </div>

            <div className="col-md-5 mx-1 my-1 text-center">
              <h6>IT Engineering</h6>
              <p>
                {" "}
                Students Registered : {studentsByBranch["IT Engineering"] || 0}
              </p>
              <p>
                Students Placed :{" "}
                <b>{studentsByBranchPlaced["IT Engineering"] || 0}</b>
              </p>
            </div>
            <div className="col-md-5 mx-1 my-1 text-center">
              <h6>Electronics Engineering</h6>
              <p>
                {" "}
                Students Registered :{" "}
                {studentsByBranch["Electronics Engineering"] || 0}
              </p>
              <p>
                Students Placed :{" "}
                <b>{studentsByBranchPlaced["Electronics Engineering"] || 0}</b>
              </p>
            </div>
            <div className="col-md-5 mx-1 my-1 text-center">
              <h6> Electronics & Telecommunication Engineering</h6>
              <p>
                Students Registered :{" "}
                {studentsByBranch[
                  "Electronics & Telecommunication Engineering"
                ] || 0}
              </p>
              <p>
                Students Placed :{" "}
                <b>
                  {studentsByBranchPlaced[
                    "Electronics & Telecommunication Engineering"
                  ] || 0}
                </b>
              </p>
            </div>
          </section>
        )}
      </Card>
    </>
  );
};

export default AdminDashboard;
