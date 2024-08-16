import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import styled from "styled-components";
import { GiTwoCoins } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import BlockedIcon from "/blocked.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../services/apiAuth";
import Spinner from "../../ui/Spinner";
import MultiSelect from "../FilterUsers/MultiSelect";
import Modal from "../../ui/Modal";
import BinOrDeleteUser from "./BinOrDeleteUser";
import * as XLSX from "xlsx";

const StyledCoins = styled(GiTwoCoins)`
  color: gold;
  font-size: 20px;
  padding-top: 5px;
`;

const TableContainer = styled.div`
  width: 95%;
  height: 50vh;
  padding: 20px;
  border-radius: var(--border-radius-lg);

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    height: 40vh;
    padding: 5px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  height: 100%;
  box-shadow: 0 2px 8px var(--shadow-md);
  border-radius: 8px;
  overflow: scroll;
  background-color: var(--color-grey-0);

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Container = styled.div`
  max-height: 45vh;
  overflow-y: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: none;
    border-radius: 6px;
    border: none;
  }
`;

const TableHead = styled.thead`
  background-color: #9d86be;
  color: rgb(230 224 224);
  font-size: 19px;
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 16px;
    height: 50px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 40px;
  }
`;

const TableRow = styled.tr`
  border-bottom: 2px solid #613d99;

  &:nth-child(even) {
    background-color: transparent;
  }
`;

const BodyTable = styled.tbody`
  width: 100%;
  opacity: ${(props) =>
    props.is_delete && props.is_delete !== null ? "0.4" : 1};
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 10px;
  }
`;
const ImageName = styled.div`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: url("/1.svg");
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    right: -5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;

    ${
      (props) =>
        props.is_delete
          ? `` // إذا كان deleted_at ليس null، لا يتم عرض أي شيء
          : !props.is_active
          ? `content: url(${BlockedIcon});`
          : props.is_online
          ? `background-color: #02c60a;`
          : `background-color: #cecece;` // إذا لم يكن online يتم تعيين اللون الرمادي
    }
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ProfileName = styled.span`
  font-size: 17px;
  width: 44%;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const StyleButtonAction = styled.button`
  background-color: #7959a1;
  padding: 6px 15px;
  border-radius: var(--border-radius-lg);
  color: var(--color-grey-0);
  border: 2px solid #7b59a1;
  font-size: 12px;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #7457a9;
  }

  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 10px;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 8px;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 98%;

  @media (max-width: 768px) {
    padding: 5px;
    width: 100%;
  }

  @media (max-width: 945px) {
    flex-direction: column; /* Stack items vertically on small screens */
    gap: 10px;
  }
`;

// Wrapper for each row of components
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (min-width: 701px) {
    gap: 10px; /* Gap between items on larger screens */
  }

  @media (max-width: 700px) {
    flex-direction: column; /* Stack items vertically on small screens */
    width: 100%;
    gap: 10px;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 5px;
  background-color: var(--color-grey-200);
  padding: 2px 4px;
  border-radius: var(--border-radius-md);

  button {
    padding: 5px 10px;
    border: none;
    font-size: 14px;
    background-color: transparent;
    color: rgb(92, 45, 145);
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    &.active {
      background-color: #cbc2db;
      border-radius: var(--border-radius-lg);
      color: var(--color-grey-0);
      border: none;
      outline: none;
      padding: 6px 12px;
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    button {
      padding: 4px 8px;
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    button {
      padding: 3px 6px;
      font-size: 10px;
    }
  }
`;

const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
`;

const ShowingInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: rgb(175, 169, 180);
`;

const ExportButton = styled.button`
  background-color:   color: rgb(175, 169, 180);
border:none;
color:primary;
  border-radius: 6px;
  padding: 10px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-image: url("./Vector.svg");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 30px 20px; /* adjust as needed */
  padding-left: 30px; /* adjust as needed */

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Select = styled.select`
  margin-left: 5px;
  padding: 5px;
  font-size: 14px;
  width: 160px;
  border: none;
  text-align: center;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Option = styled.option`
  background-color: #fff;
  border: 1px solid #5c2d91;
  color: #5c2d91;
  cursor: pointer;
  padding: 40px 20px;
`;

const DateRow = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  margin: 13px 10px 23px 10px;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 10px;
  }

  .react-datepicker {
    border: none;
    box-shadow: var(--shadow-md);
  }
  .react-datepicker__header {
    background-color: #fff;
  }
  .react-datepicker__header h2 {
    background-color: #f5eefa;
    padding: 3px;
    font-size: 10px;
    color: var(--color-grey-600);
  }
  .react-datepicker__navigation--next {
    font-size: 5px;
    &:focus {
      outline: none;
      background: none;
      border: none;
    }
  }
  .react-datepicker__navigation--previous {
    font-size: 5px;
    &:focus {
      outline: none;
      background: none;
      border: none;
    }
  }
  .react-datepicker__navigation span {
    font-size: 15px;
    cursor: pointer;
  }
  .react-datepicker__day {
    color: var(--color-grey-700);
  }
  .react-datepicker__day-names {
    padding: 7px 0px;
    font-size: 9px;
  }
  .react-datepicker__day-name {
    color: var(--color-grey-700);
  }
  .react-datepicker__day--selected {
    background-color: #e9b3d2;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #e9b3d2;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    background-color: #e9b3d2;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker-popper {
    z-index: 2000 !important;
  }
  .react-datepicker-popper {
    z-index: 2000 !important;
  }
`;

const FilterUsres = styled.div`
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const FilterUsresLabel = styled.label`
  margin: 0px 10px 0px 20px;

  @media (max-width: 768px) {
    margin: 0px 8px 0px 15px;
  }

  @media (max-width: 480px) {
    margin: 0px 5px 0px 10px;
  }
`;

const FilterUsresInput = styled.input`
  border: none;
  padding: 5px 9px;
  border-radius: 9px;
  cursor: pointer;
  background-color: var(--color-grey-300);
  color: var(--color-grey-600);
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 3px 7px;
    font-size: 10px;
  }
`;

const DateDisplay = styled.div`
  background-color: #9d86be;
  color: white;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  font-size: 14px;
  display: ${(props) => (props.show ? "block" : "none")};

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const CustomDatePicker = styled(DatePicker)`
  background-color: var(--color-grey-300);
  border: none;
  padding: 5px 9px;
  border-radius: 9px;
  color: var(--color-grey-600);
  cursor: pointer;
  z-index: 1000;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 3px 7px;
    font-size: 10px;
  }
`;

const SpinnerStyle = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserTable = ({ searchQuery }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDate, setShowDate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeletedApi, setIsDeletedApi] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Format the date to YYYY-MM-DD format
  const formatDate = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  // Get query parameters for API call
  const getQueryParams = (selectedOptions) => {
    const params = {
      is_active: "all",
      is_subscriber: "all",
      is_online: "all",
      start_date: startDate ? formatDate(startDate) : null,
      end_date: endDate ? formatDate(endDate) : null,
      search: searchQuery, // Include the search query
    };

    selectedOptions.forEach((option) => {
      if (option.value === "deleted") {
        params.is_deleted = true;
      } else {
        if (option.value.is_active !== "all") {
          params.is_active = option.value.is_active;
        }
        if (option.value.is_subscriber !== "all") {
          params.is_subscriber = option.value.is_subscriber;
        }
        if (option.value.is_online !== "all") {
          params.is_online = option.value.is_online;
        }
      }
    });

    return params;
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = getQueryParams(selectedOptions);
      let response;
      if (params.is_deleted) {
        response = await api.get("/users/deleted", { params });
        setIsDeletedApi(true);
      } else {
        response = await api.get("/users", { params });
        setIsDeletedApi(false);
      }
      console.log(response.data.data.data);
      setData(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on selectedOptions change or on both startDate and endDate changes
  useEffect(() => {
    fetchData();
  }, [selectedOptions, endDate, searchQuery]); // Add searchQuery to dependencies

  // Filter data based on local date filtering
  useEffect(() => {
    const filtered = data.filter((user) => {
      const userDate = new Date(user.updated_at);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return userDate >= start && userDate <= end;
      } else if (start) {
        return userDate >= start;
      } else if (end) {
        return userDate <= end;
      } else {
        return true;
      }
    });

    setFilteredData(filtered);
  }, [endDate, data]);

  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "الاسم",
        accessor: "username",
        Cell: ({ row }) => (
          <Link to={`${isDeletedApi ? "" : `/profile/${row.original.id}`}`}>
            <Profile>
              <ImageName
                is_active={row.original.is_active}
                is_online={row.original.is_online}
                is_delete={row.original.deleted_at}
              />
              <ProfileName>{row.original.username}</ProfileName>
              {/* <DateDisplay show={showDate === row.original.id}>
                {new Date(row.original.updated_at).toLocaleDateString()}
              </DateDisplay> */}
            </Profile>
          </Link>
        ),
      },
      { Header: "البريد الالكتروني", accessor: "email" },
      { Header: "الهاتف", accessor: "phone" },
      {
        Header: "النقاط",
        accessor: "points",
        Cell: ({ value }) => (
          <>
            {value} <StyledCoins />
          </>
        ),
      },
      {
        accessor: "action",
        Cell: ({ row }) => (
          <StyleButtonAction
            onClick={() => {
              if (isDeletedApi) {
                handleOpenModal(row.original);
              } else {
                navigate(`/profile/${row.original.id}`);
              }
            }}
          >
            {isDeletedApi ? "استعادة المستخدم" : "اذهب للصفحه الشحصيه"}
          </StyleButtonAction>
        ),
      },
    ],
    [pageSize, navigate, showDate]
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  const restoreUser = async (userId) => {
    try {
      await api.put(`/users/restore-user/${userId}`);
      console.log("User restored successfully");
      fetchData(selectedOptions, setData, setLoading, setIsDeletedApi);
    } catch (error) {
      console.error("Error restoring user", error);
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      restoreUser(selectedUser.id);
      handleCloseModal();
    }
  };

  const handleOpenModal = (user) => {
    console.log("Opening modal for user:", user);
    setSelectedUser(user);
    setShowModal(true);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize },
    },
    usePagination
  );

  useEffect(() => {
    setTablePageSize(pageSize);
  }, [pageSize, setTablePageSize]);

  return (
    <div>
      {" "}
      <TableContainer>
        <FilterContainer>
          <DateRow>
            <FilterUsres>
              <FilterUsresLabel>من:</FilterUsresLabel>
              <CustomDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="اختر تاريخ"
              />
            </FilterUsres>
            <FilterUsres>
              <FilterUsresLabel>إلى:</FilterUsresLabel>
              <CustomDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="اختر تاريخ"
              />
            </FilterUsres>
          </DateRow>
          <MultiSelect onChange={setSelectedOptions} />
        </FilterContainer>
        <Container>
          <StyledTable {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      is_delete={data.deleted_at}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <BodyTable {...getTableBodyProps()}>
              {loading ? (
                <SpinnerStyle>
                  <Spinner />
                </SpinnerStyle>
              ) : (
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      status={row.original.is_online ? "online" : "offline"}
                      onMouseEnter={() => setShowDate(row.original.id)}
                      onMouseLeave={() => setShowDate(null)}
                    >
                      {row.cells.map((cell) => (
                        <TableCell
                          {...cell.getCellProps()}
                          points={cell.column.id === "points"}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </BodyTable>
          </StyledTable>
        </Container>

        <PaginationContainer>
          <PaginationWrapper>
            <Pagination>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>
              {pageOptions.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => gotoPage(pageNumber)}
                  className={pageIndex === pageNumber ? "active" : ""}
                >
                  {pageNumber + 1}
                </button>
              ))}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>
            </Pagination>
            <PageSizeSelector>
              <Select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <Option key={size} value={size}>
                    {`عرض 1 إلى ${size} بيانات`}
                  </Option>
                ))}
              </Select>
            </PageSizeSelector>
          </PaginationWrapper>

          <PaginationWrapper>
            <ShowingInfo>
              عرض {page.length} من {data.length}
            </ShowingInfo>
            <ShowingInfo>
              <ExportButton onClick={exportToExcel}>
                استخراج ملف اكسل
              </ExportButton>
            </ShowingInfo>
          </PaginationWrapper>
        </PaginationContainer>
      </TableContainer>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <BinOrDeleteUser
            title="استعادة المستخدم"
            name={selectedUser?.username || ""}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
