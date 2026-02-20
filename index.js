<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PH03NIX Portal</title>

    <!-- KEEP YOUR EXISTING CSS FILE -->
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- ===== YOUR EXISTING CONTENT CAN STAY ABOVE ===== -->


    <!-- ============================= -->
    <!-- AI SECTION (No styling added) -->
    <!-- ============================= -->
    <section id="ai-section">
        <h2>Ask God Eye</h2>

        <input type="text" id="question" placeholder="Ask anything..." />
        <button onclick="askAI()">Ask</button>

        <p id="response"></p>
    </section>


    <!-- ============================= -->
    <!-- Complaints Section -->
    <!-- ============================= -->
    <section id="complaint-section">
        <h2>Send Complaint</h2>

        <textarea id="complaintText" placeholder="Type your complaint..."></textarea>
        <button onclick="sendComplaint()">Submit</button>

        <p id="complaintStatus"></p>

        <p>
            To enable faster transfer of messages kindly tap the link below:
        </p>

        <a href="https://wa.me/2349169158769" target="_blank">
            Open WhatsApp
        </a>
    </section>


    <!-- ===== POWERED BY TEXT ===== -->
    <footer>
        <p>POWERED BY PH03NIX</p>
    </footer>


    <!-- ============================= -->
    <!-- JavaScript (Brain Connection) -->
    <!-- ============================= -->
    <script>
        // 🔴 REPLACE WITH YOUR RAILWAY URL
        const API_URL = "https://god-eye-production.up.railway.app";


        // ===== ASK AI =====
        async function askAI() {
            const question = document.getElementById("question").value;
            const responseBox = document.getElementById("response");

            if (!question) {
                responseBox.innerText = "Please type a question.";
                return;
            }

            responseBox.innerText = "Thinking...";

            try {
                const res = await fetch(API_URL + "/ask?q=" + encodeURIComponent(question));
                const data = await res.json();

                responseBox.innerText = data.answer;
            } catch (err) {
                responseBox.innerText = "Error connecting to AI server.";
            }
        }


        // ===== SEND COMPLAINT =====
        async function sendComplaint() {
            const text = document.getElementById("complaintText").value;
            const status = document.getElementById("complaintStatus");

            if (!text) {
                status.innerText = "Complaint cannot be empty.";
                return;
            }

            status.innerText = "Sending complaint...";

            try {
                await fetch(API_URL + "/ask?q=" + encodeURIComponent("Complaint: " + text));
                status.innerText = "Complaint forwarded successfully.";
            } catch {
                status.innerText = "Failed to send complaint.";
            }
        }
    </script>

</body>
</html>
