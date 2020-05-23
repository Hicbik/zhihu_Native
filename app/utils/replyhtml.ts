const html = (content: string, time: string) => (
    `
<!doctype html>
<html lang="zh-cmn-Hans">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover">
        <link rel="stylesheet" href="dracula.min.css" >
        <link rel="stylesheet" href="quill.css">
        <style>body {overflow: hidden} img {max-width: 100%;height: auto}</style>
    </head>
    <body>
        <div class="ql-snow"><div class="ql-editor">${content}</div></div>
        <p style="color:#9e9e9e;font-size: 14px;padding: 12px 15px">${time}</p>
    </body>
</html>
        `
)


export default html
