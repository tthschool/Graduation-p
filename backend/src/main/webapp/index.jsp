<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JSPからServlet呼び出し</title>
<!-- Bootstrap CSS -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <h1 class="mt-5">JSPからServletにデータを渡す実験</h1>
    <form action="GetData" method="POST" class="mt-4">
        <div class="form-group">
            <label for="abc">Data:</label>
            <input type="text" class="form-control" id="abc" name="abc" placeholder="Enter data">
        </div>
        <div class="form-group">
            <label for="ccd">Name:</label>
            <input type="text" class="form-control" id="ccd" name="ccd" placeholder="Enter name">
        </div>
        <button type="submit" class="btn btn-primary">送信</button>
    </form>
</div>
<!-- Bootstrap JS and dependencies -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
