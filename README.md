* UploadFile-------------------------------------------------------------
---Chuyển dạng encoding enctype="multipart/form-data"
thêm vào method=POST
---bodyParser không hỗ trợ enctype="multipart/form-data 
---Cách sửa: Sử dụng 1 middleware để đọc cái enctype="multipart/form-data--
-------------npm multer
-------------Phân tích dữ liệu trước khi validate
