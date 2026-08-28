--
-- PostgreSQL database dump
--

\restrict GtS2RiLvkN0faaa0yadDZPThO2ae0SjN1u1OyQLk1fDV44NsEvAOJfhdw4rWVBH

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, email, password, role, "profileImage", "isActive", "isVerified", "createdAt", "updatedAt") FROM stdin;
2	Ahmed Hassan	instructor2@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
3	Usman Khan	instructor3@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
4	Bilal Sheikh	instructor4@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
5	Hamza Tariq	instructor5@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
6	Zubair Malik	instructor6@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
7	Fahad Iqbal	instructor7@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
8	Omer Raza	instructor8@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
9	Kashif Siddiqui	instructor9@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
10	Asad Hussain	instructor10@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
11	Nabeel Abbasi	instructor11@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
12	Waqas Dar	instructor12@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
13	Saad Baig	instructor13@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
14	Danish Chaudhry	instructor14@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
15	Haris Mahmood	instructor15@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
16	Imran Shah	instructor16@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
17	Tariq Nawaz	instructor17@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
18	Kamran Gill	instructor18@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
19	Adeel Butt	instructor19@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
20	Salman Qureshi	instructor20@test.com	$2b$10$abcdefghijklmnopqrstuv	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
21	Sara Student	student1@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
22	Ayesha Malik	student2@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
23	Zainab Bibi	student3@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
24	Fatima Noor	student4@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
25	Hira Ahmed	student5@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
26	Sana Rashid	student6@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
28	Iqra Yusuf	student8@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
29	Nida Farooq	student9@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
30	Anam Usman	student10@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
31	Mahnoor Riaz	student11@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
32	Kiran Shahzadi	student12@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
33	Areeba Hanif	student13@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
34	Laiba Pervez	student14@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
35	Alisha Tariq	student15@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
36	Tayyaba Jamil	student16@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
37	Bisma Akram	student17@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
38	Javeria Nisar	student18@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
39	Rida Aslam	student19@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
40	Saba Bashir	student20@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
41	Hamza Akram	student21@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
42	Usama Mir	student22@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
43	Hassan Raza	student23@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
44	Shoaib Akhtar	student24@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
45	Babar Azam	student25@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
46	Shaheen Afridi	student26@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
47	Naseem Shah	student27@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
48	Shadab Khan	student28@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
49	Fakhar Zaman	student29@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
50	Imad Wasim	student30@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
51	Haris Rauf	student31@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
52	Mohammad Rizwan	student32@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
53	Iftikhar Ahmed	student33@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
54	Faheem Ashraf	student34@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
55	Mohammad Nawaz	student35@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
56	Sarfaraz Ahmed	student36@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
57	Asif Ali	student37@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
58	Shan Masood	student38@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
59	Saim Ayub	student39@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
60	Zaman Khan	student40@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
61	Aamir Jamal	student41@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
62	Azam Khan	student42@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
27	Anum Rashid Ali 	student7@test.com	$2b$10$gb57eR5pmS3vW9giu5NtLO.foww3/Hg5Tlx0nM9YNRkV6nU1sBZXm	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
63	Usman Khan	student43@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
64	Abbas Afridi	student44@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
65	Ihsanullah Khan	student45@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
66	Mohammad Haris	student46@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
67	Tayyab Tahir	student47@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
68	Omair Yousuf	student48@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
69	Shahnawaz Dahani	student49@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
70	Arshad Iqbal	student50@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
71	Zeeshan Zameer	student51@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
72	Mubasir Khan	student52@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
73	Qasim Akram	student53@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
74	Mehran Mumtaz	student54@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
75	Faisal Akram	student55@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
76	Arafat Minhas	student56@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
77	Saad Baig	student57@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
78	Ali Asfand	student58@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
79	Shamyl Hussain	student59@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
80	Shahzaib Khan	student60@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
81	Ubaid Shah	student61@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
82	Mohammad Zeeshan	student62@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
83	Naveed Ahmed	student63@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
84	Awais Ali	student64@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
85	Ahmad Hassan	student65@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
86	Haroon Rashid	student66@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
87	Kamran Akmal	student67@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
88	Umar Akmal	student68@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
89	Adnan Akmal	student69@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
90	Sohail Tanvir	student70@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
91	Rana Naved	student71@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
92	Rao Iftikhar	student72@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
93	Yasir Arafat	student73@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
94	Mohammad Asif	student74@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
95	Mohammad Amir	student75@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
96	Saeed Ajmal	student76@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
97	Abdur Rehman	student77@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
98	Zulfiqar Babar	student78@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
99	Yasir Shah	student79@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
100	Bilal Asif	student80@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
101	Sajid Khan	student81@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
102	Nauman Ali	student82@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
103	Zahid Mahmood	student83@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
104	Abrar Ahmed	student84@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
105	Usama Mir	student85@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
106	Sufiyan Muqeem	student86@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
107	Faisal Iqbal	student87@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
108	Imran Farhat	student88@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
109	Tawfeeq Umar	student89@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
110	Yasir Hameed	student90@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
111	Assem Hameed	student91@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
112	Khurram Manzoor	student92@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
113	Sami Aslam	student93@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
114	Sharjeel Khan	student94@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
115	Abid Ali	student95@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
116	Imam-ul-Haq	student96@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
117	Abdullah Shafique	student97@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
118	Saud Shakeel	student98@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
119	Agha Salman	student99@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
120	Kamran Ghulam	student100@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
121	Hussain Talat	student101@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
122	Asif Zakir	student102@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
123	Usman Salahuddin	student103@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
124	Saad Ali	student104@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
125	Sohaib Maqsood	student105@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
126	Haris Sohail	student106@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
127	Umar Amin	student107@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
128	Hammad Azam	student108@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
129	Bismillah Khan	student109@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
130	Rohail Nazir	student110@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
131	Zeeshan Malik	student111@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
132	Saif Badar	student112@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
133	Ali Zaryab	student113@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
134	Muhammad Huraira	student114@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
135	Mubasir Khan	student115@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
136	Omair Yousuf	student116@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
137	Ali Imran	student117@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
138	Adnan Ghous	student118@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
139	Waqas Ahmed	student119@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
140	Sadaf Hussain	student120@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
141	Tabish Khan	student121@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
142	Sameen Gul	student122@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
143	Mir Hamza	student123@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
144	Ehsan Adil	student124@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
145	Zia-ul-Haq	student125@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
146	Usman Shinwari	student126@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
147	Rumman Raees	student127@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
148	Sadaf Hussain	student128@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
149	Aamer Yamin	student129@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
150	Amad Butt	student130@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
151	Anwar Ali	student131@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
152	Bilawal Bhatti	student132@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
153	Imran Khan	student133@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
154	Wasim Akram	student134@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
155	Waqar Younis	student135@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
156	Inzamam-ul-Haq	student136@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
158	Javed Miandad	student138@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
159	Zaheer Abbas	student139@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
160	Hanif Mohammad	student140@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
161	Fazal Mahmood	student141@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
162	Abdul Qadir	student142@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
163	Mushtaq Ahmed	student143@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
164	Saqlain Mushtaq	student144@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
165	Moin Khan	student145@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
166	Rashid Latif	student146@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
167	Aaqib Javed	student147@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
168	Mudassar Nazar	student148@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
169	Mohsin Khan	student149@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
170	Aamer Sohail	student150@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
171	Ijaz Ahmed	student151@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
172	Saleem Malik	student152@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
173	Basit Ali	student153@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
174	Younis Khan	student154@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
175	Misbah-ul-Haq	student155@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
176	Mohammad Yousuf	student156@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
177	Abdul Razzaq	student157@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
178	Azhar Mahmood	student158@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
179	Shoaib Malik	student159@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
180	Shahid Afridi	student160@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
181	Azhar Ali	student161@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
182	Asad Shafiq	student162@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
183	Mohammad Hafeez	student163@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
184	Taufeeq Umar	student164@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
185	Fawad Alam	student165@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
186	Sohail Khan	student166@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
187	Imran Khan Jr	student167@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
188	Zafar Gohar	student168@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
189	Usman Qadir	student169@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
190	Arshad Iqbal	student170@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
191	Danish Aziz	student171@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
192	Zeeshan Ashraf	student172@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
193	Amad Butt	student173@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
194	Zahid Mahmood	student174@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
195	Salman Ali Agha	student175@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
196	Mohammad Ali	student176@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
197	Aamer Jamal	student177@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
198	Saim Ayub	student178@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
199	Haseebullah Khan	student179@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
200	Mehran Mumtaz	student180@test.com	$2b$10$abcdefghijklmnopqrstuv	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
201	Ali Hassan	alifayyaz@gmail.com	$2b$10$gb57eR5pmS3vW9giu5NtLO.foww3/Hg5Tlx0nM9YNRkV6nU1sBZXm	student	\N	t	f	2026-08-24 12:14:29.750577	2026-08-24 12:14:29.750577
202	talal	alifayyaz1@gmail.com	$2b$10$.y96QJkD1iY6tMMhC6qL7.BWYWhZf6rJLdbzAZA2.EV4LC1iILApS	instructor	\N	t	f	2026-08-24 14:16:01.26233	2026-08-24 14:16:01.26233
157	Saeed Anwar	student137@test.com	$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW	student	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
1	Ali Instructor	alifayyaz2@gmail.com	$2b$10$gb57eR5pmS3vW9giu5NtLO.foww3/Hg5Tlx0nM9YNRkV6nU1sBZXm	instructor	\N	t	f	2026-08-24 11:45:21.381357	2026-08-24 11:45:21.381357
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.course (id, title, description, "instructorId", "isPublished", "createdAt") FROM stdin;
1	Introduction to NestJS	Learn backend basics with NestJS framework.	1	t	2026-08-24 11:47:50.826633
3	ReactJS for Beginners	Master Modern React with Hooks and Redux.	2	t	2026-08-24 11:47:50.826633
4	Node.js Microservices	Build scalable microservices with Express and RabbitMQ.	2	t	2026-08-24 11:47:50.826633
5	Docker & Kubernetes Masterclass	Containerize applications and orchestrate with K8s.	3	t	2026-08-24 11:47:50.826633
6	Python for Data Science	Data analysis using Pandas, NumPy, and Matplotlib.	3	t	2026-08-24 11:47:50.826633
7	Flutter Mobile Apps	Build cross-platform iOS and Android apps with Dart.	4	t	2026-08-24 11:47:50.826633
8	Cybersecurity Fundamentals	Ethical hacking, network security, and cryptography.	4	t	2026-08-24 11:47:50.826633
9	TypeScript Deep Dive	Learn advanced types, generics, and decorators.	5	t	2026-08-24 11:47:50.826633
10	GraphQL with Apollo	Build modern APIs using GraphQL and Apollo Server.	5	t	2026-08-24 11:47:50.826633
11	Vue.js 3 Complete Guide	Frontend web development with Vue 3 and Pinia.	6	t	2026-08-24 11:47:50.826633
12	MongoDB & NoSQL	Document-based database modeling and aggregations.	6	t	2026-08-24 11:47:50.826633
13	AWS Cloud Architecture	Master AWS services: EC2, S3, Lambda, and DynamoDB.	7	t	2026-08-24 11:47:50.826633
14	Machine Learning Fundamentals	Supervised and unsupervised learning with Scikit-Learn.	7	t	2026-08-24 11:47:50.826633
15	Next.js Fullstack Apps	Build SSR and Static sites with React and Next.js.	8	t	2026-08-24 11:47:50.826633
16	Redis Caching Strategies	In-memory caching, pub/sub, and data structures.	8	t	2026-08-24 11:47:50.826633
17	DevOps CI/CD Pipelines	Automate builds with GitHub Actions and GitLab CI.	9	t	2026-08-24 11:47:50.826633
18	Tailwind CSS Masterclass	Utility-first CSS framework for modern UI design.	9	t	2026-08-24 11:47:50.826633
19	Go (Golang) Backend	Fast concurrent microservices with Go.	10	t	2026-08-24 11:47:50.826633
20	Kafka Event Streaming	Real-time data streaming and event-driven architecture.	10	t	2026-08-24 11:47:50.826633
21	Angular Enterprise Edition	Build large scale web apps using Angular.	11	t	2026-08-24 11:47:50.826633
22	Rust Programming Guide	Memory safety and high performance systems programming.	11	t	2026-08-24 11:47:50.826633
23	System Design Interview Prep	Scale apps to millions of users with distributed systems.	12	t	2026-08-24 11:47:50.826633
24	Spring Boot Fundamentals	Java backend enterprise applications with Spring.	12	t	2026-08-24 11:47:50.826633
25	Kubernetes Administration	Manage enterprise Kubernetes clusters.	13	t	2026-08-24 11:47:50.826633
26	Figma UI/UX Essentials	Design modern user interfaces and prototypes.	13	t	2026-08-24 11:47:50.826633
27	GraphQL vs REST APIs	Architectural comparison and migration strategies.	14	t	2026-08-24 11:47:50.826633
28	Elasticsearch Analytics	Log indexing and real-time search engine implementation.	14	t	2026-08-24 11:47:50.826633
29	Django Web Framework	Python fullstack web app development.	15	t	2026-08-24 11:47:50.826633
30	Git Version Control Mastery	Branching strategies, rebase, and team workflows.	15	t	2026-08-24 11:47:50.826633
31	Linux System Administration	Bash scripting and server management.	16	t	2026-08-24 11:47:50.826633
32	TensorFlow Deep Learning	Neural networks and computer vision with AI.	16	t	2026-08-24 11:47:50.826633
33	React Native Essentials	Cross platform mobile applications with React.	17	t	2026-08-24 11:47:50.826633
34	Solid Principles & Clean Code	Writing maintainable and testable software architecture.	17	t	2026-08-24 11:47:50.826633
35	Serverless Architecture	AWS Lambda, API Gateway, and DynamoDB backend.	18	t	2026-08-24 11:47:50.826633
36	Ethical Hacking & Pentesting	Penetration testing techniques for web apps.	18	t	2026-08-24 11:47:50.826633
37	Ansible Automation Guide	Infrastructure as Code automation.	19	t	2026-08-24 11:47:50.826633
38	Unit Testing with Jest	Test driven development (TDD) for JavaScript.	19	t	2026-08-24 11:47:50.826633
39	Kotlin for Android	Modern Android development using Jetpack Compose.	20	t	2026-08-24 11:47:50.826633
40	Microfrontends Architecture	Scaling frontend apps with module federation.	20	t	2026-08-24 11:47:50.826633
2	Advanced PostgreSQL	Deep dive into relational databases, indexing, and optimization.	1	t	2026-08-24 11:47:50.826633
41	gsgag	fgsas	202	t	2026-08-25 11:06:29.715493
42	fhdb	sbsdfdfbdfbsfbs	202	t	2026-08-27 10:50:24.372795
\.


--
-- Data for Name: assignment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assignment (id, title, description, deadline, "courseId") FROM stdin;
1	Week 1 Assignment	Build a simple CRUD API using NestJS.	2026-09-01 00:00:00	1
2	Week 2 Assignment	Write complex SQL queries with indexing.	2026-09-10 00:00:00	2
3	React Todo App	Build a Todo app with Redux Toolkit state.	2026-09-05 00:00:00	3
4	Microservices Architecture	Setup RabbitMQ event bus between two Node APIs.	2026-09-15 00:00:00	4
5	Dockerize Application	Create multi-stage Dockerfile for NestJS app.	2026-09-08 00:00:00	5
6	Pandas Data Analysis	Clean and analyze customer sales dataset.	2026-09-12 00:00:00	6
7	Flutter E-Commerce UI	Design responsive mobile checkout screen.	2026-09-14 00:00:00	7
8	Security Audit Report	Identify OWASP vulnerabilities in sample app.	2026-09-20 00:00:00	8
9	TypeScript Utility Types	Implement custom utility types without standard library.	2026-09-04 00:00:00	9
10	GraphQL API Schema	Design schema for blog system with posts and comments.	2026-09-11 00:00:00	10
11	Vue 3 Dashboard	Create interactive dashboard using Pinia.	2026-09-18 00:00:00	11
12	MongoDB Aggregation	Write pipelines for sales reporting analytics.	2026-09-22 00:00:00	12
13	Deploy AWS Infrastructure	Provision EC2 and S3 via Terraform or AWS Console.	2026-09-25 00:00:00	13
14	ML Model Training	Train linear regression model on housing dataset.	2026-09-30 00:00:00	14
15	Next.js Blog Platform	Build SSR blog with dynamic MDX rendering.	2026-09-16 00:00:00	15
16	Redis Rate Limiter	Implement API rate limiting middleware using Redis.	2026-09-19 00:00:00	16
17	GitHub Actions Pipeline	Automate testing and container deployment pipeline.	2026-09-21 00:00:00	17
18	Tailwind Landing Page	Build responsive SaaS product page.	2026-09-03 00:00:00	18
19	Go Web Crawler	Write concurrent web crawler using Goroutines.	2026-09-27 00:00:00	19
20	Kafka Stream Processing	Process real-time transaction logs with Kafka.	2026-09-28 00:00:00	20
21	Angular Admin Portal	Implement lazy loaded routes and auth guards.	2026-09-29 00:00:00	21
22	Rust CLI Tool	Build fast file-search command line utility.	2026-10-01 00:00:00	22
23	Distributed Cache Design	Submit high-level system design architecture document.	2026-10-05 00:00:00	23
24	Spring Boot REST API	Implement JWT authentication with Spring Security.	2026-10-02 00:00:00	24
25	Deploy K8s Microservice	Write Kubernetes manifests for deployment and ingress.	2026-10-08 00:00:00	25
26	Figma Mobile App Prototype	Design high-fidelity user interface prototype.	2026-09-15 00:00:00	26
27	GraphQL Migration Strategy	Document step-by-step REST to GraphQL migration.	2026-09-24 00:00:00	27
28	Elasticsearch Log Analyzer	Index server logs and create Kibana dashboard.	2026-10-10 00:00:00	28
29	Django E-Store Backend	Build relational database models and views.	2026-09-17 00:00:00	29
30	Git Strategy Documentation	Outline trunk-based development strategy for team.	2026-09-09 00:00:00	30
31	Linux Shell Automation	Write bash script to automate daily system backups.	2026-09-26 00:00:00	31
32	CNN Image Classifier	Train neural network on MNIST dataset.	2026-10-12 00:00:00	32
33	React Native Offline Sync	Implement offline storage sync with local SQLite.	2026-10-04 00:00:00	33
34	SOLID Refactoring Exercise	Refactor legacy spaghetti code into SOLID structure.	2026-09-13 00:00:00	34
35	AWS Serverless Stack	Build API Gateway + Lambda + DynamoDB CRUD.	2026-10-06 00:00:00	35
36	Web App Pentest Report	Perform vulnerability assessment on target staging server.	2026-10-14 00:00:00	36
37	Ansible Server Provisioning	Write playbook to setup Nginx and PostgreSQL.	2026-09-23 00:00:00	37
38	TDD Jest Testing	Write 100% coverage unit tests for payment module.	2026-09-07 00:00:00	38
39	Android Jetpack App	Build news reader app using Jetpack Compose.	2026-10-11 00:00:00	39
40	Microfrontends Webpack Setup	Configure module federation for host and remote apps.	2026-10-15 00:00:00	40
42	dfbdsdfdbsdf	sfgsdfgsfg	2026-08-27 00:00:00	42
\.


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.enrollment (id, "enrolledAt", "studentId", "courseId", "progressPercentage") FROM stdin;
2	2026-08-24 11:57:40.072327	21	2	50
4	2026-08-24 11:57:40.072327	22	3	100
5	2026-08-24 11:57:40.072327	23	2	100
6	2026-08-24 11:57:40.072327	23	4	20
7	2026-08-24 11:57:40.072327	24	5	100
8	2026-08-24 11:57:40.072327	24	6	40
9	2026-08-24 11:57:40.072327	25	7	100
10	2026-08-24 11:57:40.072327	25	8	100
11	2026-08-24 11:57:40.072327	26	9	100
12	2026-08-24 11:57:40.072327	26	10	10
15	2026-08-24 11:57:40.072327	28	13	100
16	2026-08-24 11:57:40.072327	28	14	60
17	2026-08-24 11:57:40.072327	29	15	100
18	2026-08-24 11:57:40.072327	29	16	90
19	2026-08-24 11:57:40.072327	30	17	100
20	2026-08-24 11:57:40.072327	30	18	100
21	2026-08-24 11:57:40.072327	31	19	30
22	2026-08-24 11:57:40.072327	31	20	100
23	2026-08-24 11:57:40.072327	32	21	100
24	2026-08-24 11:57:40.072327	32	22	50
25	2026-08-24 11:57:40.072327	33	23	100
26	2026-08-24 11:57:40.072327	33	24	100
27	2026-08-24 11:57:40.072327	34	25	100
28	2026-08-24 11:57:40.072327	34	26	70
29	2026-08-24 11:57:40.072327	35	27	100
30	2026-08-24 11:57:40.072327	35	28	85
31	2026-08-24 11:57:40.072327	36	29	100
32	2026-08-24 11:57:40.072327	36	30	45
33	2026-08-24 11:57:40.072327	37	31	100
34	2026-08-24 11:57:40.072327	37	32	100
35	2026-08-24 11:57:40.072327	38	33	100
36	2026-08-24 11:57:40.072327	38	34	15
37	2026-08-24 11:57:40.072327	39	35	100
38	2026-08-24 11:57:40.072327	39	36	95
39	2026-08-24 11:57:40.072327	40	37	100
40	2026-08-24 11:57:40.072327	40	38	100
41	2026-08-24 11:57:40.072327	41	39	100
42	2026-08-24 11:57:40.072327	41	40	60
44	2026-08-24 11:57:40.072327	42	3	100
45	2026-08-24 11:57:40.072327	43	2	35
46	2026-08-24 11:57:40.072327	43	5	100
47	2026-08-24 11:57:40.072327	44	4	100
48	2026-08-24 11:57:40.072327	44	7	80
49	2026-08-24 11:57:40.072327	45	6	100
50	2026-08-24 11:57:40.072327	45	8	100
51	2026-08-24 11:57:40.072327	46	9	50
52	2026-08-24 11:57:40.072327	46	11	100
53	2026-08-24 11:57:40.072327	47	10	100
54	2026-08-24 11:57:40.072327	47	12	65
55	2026-08-24 11:57:40.072327	48	13	100
56	2026-08-24 11:57:40.072327	48	15	100
57	2026-08-24 11:57:40.072327	49	14	20
58	2026-08-24 11:57:40.072327	49	16	100
59	2026-08-24 11:57:40.072327	50	17	100
60	2026-08-24 11:57:40.072327	50	19	75
61	2026-08-24 11:57:40.072327	51	18	100
62	2026-08-24 11:57:40.072327	51	20	100
63	2026-08-24 11:57:40.072327	52	21	10
64	2026-08-24 11:57:40.072327	52	23	100
65	2026-08-24 11:57:40.072327	53	22	100
66	2026-08-24 11:57:40.072327	53	24	90
67	2026-08-24 11:57:40.072327	54	25	100
68	2026-08-24 11:57:40.072327	54	27	100
69	2026-08-24 11:57:40.072327	55	26	40
70	2026-08-24 11:57:40.072327	55	28	100
71	2026-08-24 11:57:40.072327	56	29	100
72	2026-08-24 11:57:40.072327	56	31	80
73	2026-08-24 11:57:40.072327	57	30	100
74	2026-08-24 11:57:40.072327	57	32	100
75	2026-08-24 11:57:40.072327	58	33	55
76	2026-08-24 11:57:40.072327	58	35	100
77	2026-08-24 11:57:40.072327	59	34	100
78	2026-08-24 11:57:40.072327	59	36	100
79	2026-08-24 11:57:40.072327	60	37	25
80	2026-08-24 11:57:40.072327	60	39	100
81	2026-08-24 11:57:40.072327	61	38	100
82	2026-08-24 11:57:40.072327	61	40	100
84	2026-08-24 11:57:40.072327	62	4	60
85	2026-08-24 11:57:40.072327	63	2	100
86	2026-08-24 11:57:40.072327	63	6	100
87	2026-08-24 11:57:40.072327	64	3	100
88	2026-08-24 11:57:40.072327	64	5	30
89	2026-08-24 11:57:40.072327	65	7	100
90	2026-08-24 11:57:40.072327	65	9	100
91	2026-08-24 11:57:40.072327	66	8	70
92	2026-08-24 11:57:40.072327	66	10	100
93	2026-08-24 11:57:40.072327	67	11	100
94	2026-08-24 11:57:40.072327	67	13	100
95	2026-08-24 11:57:40.072327	68	12	100
96	2026-08-24 11:57:40.072327	68	14	45
97	2026-08-24 11:57:40.072327	69	15	100
98	2026-08-24 11:57:40.072327	69	17	100
99	2026-08-24 11:57:40.072327	70	16	80
100	2026-08-24 11:57:40.072327	70	18	100
101	2026-08-24 11:57:40.072327	71	19	100
102	2026-08-24 11:57:40.072327	71	21	100
103	2026-08-24 11:57:40.072327	72	20	15
104	2026-08-24 11:57:40.072327	72	22	100
105	2026-08-24 11:57:40.072327	73	23	100
106	2026-08-24 11:57:40.072327	73	25	85
107	2026-08-24 11:57:40.072327	74	24	100
108	2026-08-24 11:57:40.072327	74	26	100
109	2026-08-24 11:57:40.072327	75	27	50
110	2026-08-24 11:57:40.072327	75	29	100
111	2026-08-24 11:57:40.072327	76	28	100
112	2026-08-24 11:57:40.072327	76	30	100
113	2026-08-24 11:57:40.072327	77	31	90
114	2026-08-24 11:57:40.072327	77	33	100
115	2026-08-24 11:57:40.072327	78	32	100
116	2026-08-24 11:57:40.072327	78	34	65
117	2026-08-24 11:57:40.072327	79	35	100
118	2026-08-24 11:57:40.072327	79	37	100
119	2026-08-24 11:57:40.072327	80	36	100
120	2026-08-24 11:57:40.072327	80	38	40
121	2026-08-24 11:57:40.072327	81	39	100
123	2026-08-24 11:57:40.072327	82	40	100
124	2026-08-24 11:57:40.072327	82	2	75
125	2026-08-24 11:57:40.072327	83	3	100
126	2026-08-24 11:57:40.072327	83	5	100
127	2026-08-24 11:57:40.072327	84	4	20
128	2026-08-24 11:57:40.072327	84	6	100
129	2026-08-24 11:57:40.072327	85	7	100
130	2026-08-24 11:57:40.072327	85	9	85
131	2026-08-24 11:57:40.072327	86	8	100
132	2026-08-24 11:57:40.072327	86	10	100
133	2026-08-24 11:57:40.072327	87	11	60
134	2026-08-24 11:57:40.072327	87	12	100
135	2026-08-24 11:57:40.072327	88	13	100
136	2026-08-24 11:57:40.072327	88	14	100
3	2026-08-24 11:57:40.072327	22	1	38
43	2026-08-24 11:57:40.072327	42	1	50
122	2026-08-24 11:57:40.072327	81	1	0
14	2026-08-24 11:57:40.072327	27	12	100
13	2026-08-24 11:57:40.072327	27	11	100
137	2026-08-24 11:57:40.072327	89	15	35
138	2026-08-24 11:57:40.072327	89	16	100
139	2026-08-24 11:57:40.072327	90	17	100
140	2026-08-24 11:57:40.072327	90	18	95
141	2026-08-24 11:57:40.072327	91	19	100
142	2026-08-24 11:57:40.072327	91	20	100
143	2026-08-24 11:57:40.072327	92	21	100
144	2026-08-24 11:57:40.072327	92	22	10
145	2026-08-24 11:57:40.072327	93	23	100
146	2026-08-24 11:57:40.072327	93	24	80
147	2026-08-24 11:57:40.072327	94	25	100
148	2026-08-24 11:57:40.072327	94	26	100
149	2026-08-24 11:57:40.072327	95	27	100
150	2026-08-24 11:57:40.072327	95	28	50
151	2026-08-24 11:57:40.072327	96	29	100
152	2026-08-24 11:57:40.072327	96	30	100
153	2026-08-24 11:57:40.072327	97	31	40
154	2026-08-24 11:57:40.072327	97	32	100
155	2026-08-24 11:57:40.072327	98	33	100
156	2026-08-24 11:57:40.072327	98	34	90
157	2026-08-24 11:57:40.072327	99	35	100
158	2026-08-24 11:57:40.072327	99	36	100
159	2026-08-24 11:57:40.072327	100	37	100
160	2026-08-24 11:57:40.072327	100	38	15
161	2026-08-24 11:57:40.072327	101	39	100
162	2026-08-24 11:57:40.072327	101	40	100
164	2026-08-24 11:57:40.072327	102	5	80
165	2026-08-24 11:57:40.072327	103	2	100
166	2026-08-24 11:57:40.072327	103	6	100
167	2026-08-24 11:57:40.072327	104	3	70
168	2026-08-24 11:57:40.072327	104	7	100
169	2026-08-24 11:57:40.072327	105	4	100
170	2026-08-24 11:57:40.072327	105	8	100
171	2026-08-24 11:57:40.072327	106	9	100
172	2026-08-24 11:57:40.072327	106	10	25
173	2026-08-24 11:57:40.072327	107	11	100
174	2026-08-24 11:57:40.072327	107	12	90
175	2026-08-24 11:57:40.072327	108	13	100
176	2026-08-24 11:57:40.072327	108	14	100
177	2026-08-24 11:57:40.072327	109	15	100
178	2026-08-24 11:57:40.072327	109	16	60
179	2026-08-24 11:57:40.072327	110	17	100
180	2026-08-24 11:57:40.072327	110	18	100
181	2026-08-24 11:57:40.072327	111	19	85
182	2026-08-24 11:57:40.072327	111	20	100
183	2026-08-24 11:57:40.072327	112	21	100
184	2026-08-24 11:57:40.072327	112	22	100
185	2026-08-24 11:57:40.072327	113	23	30
186	2026-08-24 11:57:40.072327	113	24	100
187	2026-08-24 11:57:40.072327	114	25	100
188	2026-08-24 11:57:40.072327	114	26	95
189	2026-08-24 11:57:40.072327	115	27	100
190	2026-08-24 11:57:40.072327	115	28	100
191	2026-08-24 11:57:40.072327	116	29	100
192	2026-08-24 11:57:40.072327	116	30	10
193	2026-08-24 11:57:40.072327	117	31	100
194	2026-08-24 11:57:40.072327	117	32	75
195	2026-08-24 11:57:40.072327	118	33	100
196	2026-08-24 11:57:40.072327	118	34	100
197	2026-08-24 11:57:40.072327	119	35	100
198	2026-08-24 11:57:40.072327	119	36	45
199	2026-08-24 11:57:40.072327	120	37	100
200	2026-08-24 11:57:40.072327	120	38	100
1	2026-08-24 11:57:40.072327	21	1	50
83	2026-08-24 11:57:40.072327	62	1	38
163	2026-08-24 11:57:40.072327	102	1	0
218	2026-08-28 10:33:44.569981	201	42	0
220	2026-08-28 11:11:26.062615	201	41	0
222	2026-08-28 11:20:46.750751	201	7	100
214	2026-08-27 10:45:22.17069	201	2	100
223	2026-08-28 13:16:55.482401	201	6	100
228	2026-08-28 13:21:19.481556	201	28	0
229	2026-08-28 13:23:21.861923	201	18	100
\.


--
-- Data for Name: assignment_submission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assignment_submission (id, content, "fileUrl", grade, comment, "submittedAt", "enrollmentId", "assignmentId") FROM stdin;
1	Here is my NestJS CRUD submission.	/uploads/submission1.pdf	A	Great work on architecture!	2026-08-24 12:08:20.507994	1	1
2	SQL queries optimization submission.	/uploads/submission2.pdf	B	Good performance improvements.	2026-08-24 12:08:20.507994	2	2
3	React Todo application source code.	https://github.com/student/react-todo	A+	Clean component structure.	2026-08-24 12:08:20.507994	3	3
4	Microservices repo link attached.	https://github.com/student/node-ms	A	RabbitMQ handling is well done.	2026-08-24 12:08:20.507994	4	4
5	Dockerfile and compose files.	/uploads/dockerfile.zip	A	Multi-stage build is very efficient.	2026-08-24 12:08:20.507994	5	5
6	Pandas analytics notebook.	/uploads/data_analysis.ipynb	B+	Nice charts and conclusions.	2026-08-24 12:08:20.507994	6	6
7	Flutter source code and APK.	/uploads/flutter_app.apk	A	Smooth UI rendering.	2026-08-24 12:08:20.507994	7	7
8	Security vulnerabilities audit document.	/uploads/security_report.pdf	A+	Thorough OWASP analysis.	2026-08-24 12:08:20.507994	8	8
9	TypeScript solution file.	/uploads/types.ts	A	Clever usage of mapped types.	2026-08-24 12:08:20.507994	9	9
10	GraphQL Schema submission text.	/uploads/schema.graphql	B	Solid schema organization.	2026-08-24 12:08:20.507994	10	10
11	Vue 3 dashboard repository.	https://github.com/student/vue-dash	A	Pinia state managed properly.	2026-08-24 12:08:20.507994	11	11
12	MongoDB aggregations pipeline code.	/uploads/queries.js	A	Optimal pipeline execution.	2026-08-24 12:08:20.507994	12	12
13	AWS Terraform scripts.	https://github.com/student/aws-infra	A+	Infrastructure as code deployed.	2026-08-24 12:08:20.507994	13	13
14	Jupyter notebook with model accuracy.	/uploads/model.ipynb	B	Precision could be slightly higher.	2026-08-24 12:08:20.507994	14	14
15	Next.js blog hosted on Vercel.	https://my-blog.vercel.app	A+	Blazing fast load times.	2026-08-24 12:08:20.507994	15	15
16	Redis middleware implementation.	/uploads/rate_limiter.js	A	Clean key expiration logic.	2026-08-24 12:08:20.507994	16	16
17	GitHub Action YAML pipeline.	/uploads/ci_cd.yml	A	Automated testing configured.	2026-08-24 12:08:20.507994	17	17
18	Tailwind landing page preview URL.	https://tailwind-landing.pages.dev	A+	Fully responsive design.	2026-08-24 12:08:20.507994	18	18
19	Go web crawler code.	/uploads/crawler.go	A	Proper channel usage.	2026-08-24 12:08:20.507994	19	19
20	Kafka consumer and producer logs.	/uploads/kafka_logs.txt	B+	Event streams functioning.	2026-08-24 12:08:20.507994	20	20
21	Angular admin dashboard app.	https://github.com/student/angular-admin	A	Lazy loading working.	2026-08-24 12:08:20.507994	21	21
22	Rust CLI binary link.	/uploads/search_cli.zip	A+	Extremely fast execution.	2026-08-24 12:08:20.507994	22	22
23	System Architecture PDF document.	/uploads/system_design.pdf	A	Clear caching strategies.	2026-08-24 12:08:20.507994	23	23
24	Spring Security REST API.	https://github.com/student/spring-api	A	JWT filters implemented well.	2026-08-24 12:08:20.507994	24	24
25	Kubernetes YAML manifests.	/uploads/k8s_manifests.zip	A+	Services & Ingress configured.	2026-08-24 12:08:20.507994	25	25
26	Figma workspace design share link.	https://figma.com/file/sample-ux	A+	Great visual hierarchy.	2026-08-24 12:08:20.507994	26	26
27	Elasticsearch configuration script.	/uploads/es_config.json	A	Log indexing working fine.	2026-08-24 12:08:20.507994	28	28
28	Django models implementation.	https://github.com/student/django-store	B+	ORM relationships clean.	2026-08-24 12:08:20.507994	29	29
29	TensorFlow Jupyter notebook.	/uploads/cnn_model.ipynb	A	98% classification accuracy.	2026-08-24 12:08:20.507994	32	32
30	AWS Serverless SAM application.	https://github.com/student/serverless-app	A+	Deployed smoothly on AWS.	2026-08-24 12:08:20.507994	35	35
32	\N	/uploads/1787908252269-879849100.png	A+		2026-08-28 14:10:52.521709	218	42
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (id, name) FROM stdin;
19	Web Development
20	Backend Engineering
21	Database Systems
22	Frontend Frameworks
23	Mobile App Development
24	DevOps & Cloud
25	Data Science & AI
26	Cybersecurity
27	Software Architecture
28	UI/UX Design
\.


--
-- Data for Name: certificate; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.certificate (id, "issuedAt", "enrollmentId") FROM stdin;
1	2026-08-24 12:08:38.129746	1
2	2026-08-24 12:08:38.129746	4
3	2026-08-24 12:08:38.129746	5
4	2026-08-24 12:08:38.129746	7
5	2026-08-24 12:08:38.129746	9
6	2026-08-24 12:08:38.129746	10
7	2026-08-24 12:08:38.129746	11
8	2026-08-24 12:08:38.129746	13
9	2026-08-24 12:08:38.129746	15
10	2026-08-24 12:08:38.129746	17
21	2026-08-28 13:16:17.499405	222
22	2026-08-28 13:16:38.417325	214
23	2026-08-28 13:17:04.964614	223
25	2026-08-28 13:25:05.114583	14
26	2026-08-28 15:08:35.822851	229
\.


--
-- Data for Name: course_categories_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.course_categories_category ("courseId", "categoryId") FROM stdin;
1	19
1	20
2	20
2	21
3	19
3	22
4	20
4	27
5	24
6	25
7	23
8	26
9	19
9	20
10	20
11	22
12	21
13	24
14	25
15	19
15	22
16	20
16	21
17	24
18	19
18	28
19	20
20	20
20	27
21	22
22	20
22	27
23	27
24	20
25	24
26	28
27	20
28	21
29	19
29	20
30	24
31	24
32	25
33	23
34	27
35	24
36	26
37	24
38	19
39	23
41	23
42	26
\.


--
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lesson (id, title, description, "videoUrl", "resourceUrl", "order", "createdAt", "courseId") FROM stdin;
1	What is Dependency Injection	Core NestJS concept.	https://youtube.com/watch?v=nest1	\N	1	2026-08-24 11:57:19.333908	1
2	Setting up TypeORM	Connecting Postgres to NestJS.	https://youtube.com/watch?v=nest2	\N	2	2026-08-24 11:57:19.333908	1
3	Controllers & Services	Structuring NestJS architecture.	https://youtube.com/watch?v=nest3	\N	3	2026-08-24 11:57:19.333908	1
4	Custom Pipes & Guards	Validating and securing endpoints.	https://youtube.com/watch?v=nest4	\N	4	2026-08-24 11:57:19.333908	1
5	PostgreSQL Indexing	B-Tree and Hash indexes.	https://youtube.com/watch?v=pg1	\N	1	2026-08-24 11:57:19.333908	2
6	Query Optimization	EXPLAIN ANALYZE and execution plans.	https://youtube.com/watch?v=pg2	\N	2	2026-08-24 11:57:19.333908	2
7	ACID Transactions	Managing database integrity.	https://youtube.com/watch?v=pg3	\N	3	2026-08-24 11:57:19.333908	2
8	React JSX & Components	Fundamentals of React.	https://youtube.com/watch?v=react1	\N	1	2026-08-24 11:57:19.333908	3
9	State Management with useState	Local state management.	https://youtube.com/watch?v=react2	\N	2	2026-08-24 11:57:19.333908	3
10	useEffect Lifecycle Hook	Handling side effects.	https://youtube.com/watch?v=react3	\N	3	2026-08-24 11:57:19.333908	3
11	Redux Toolkit Setup	Global state management.	https://youtube.com/watch?v=react4	\N	4	2026-08-24 11:57:19.333908	3
12	Microservices Overview	Monolith vs Microservices.	https://youtube.com/watch?v=node1	\N	1	2026-08-24 11:57:19.333908	4
13	RabbitMQ Message Queue	Asynchronous communication.	https://youtube.com/watch?v=node2	\N	2	2026-08-24 11:57:19.333908	4
14	API Gateway Pattern	Routing client requests.	https://youtube.com/watch?v=node3	\N	3	2026-08-24 11:57:19.333908	4
15	Docker Containers Basics	Images vs Containers.	https://youtube.com/watch?v=doc1	\N	1	2026-08-24 11:57:19.333908	5
16	Dockerfile Custom Builds	Building lightweight images.	https://youtube.com/watch?v=doc2	\N	2	2026-08-24 11:57:19.333908	5
17	Kubernetes Pods & Deployments	Orchestrating containers.	https://youtube.com/watch?v=doc3	\N	3	2026-08-24 11:57:19.333908	5
18	Kubernetes Ingress Controller	Exposing cluster services.	https://youtube.com/watch?v=doc4	\N	4	2026-08-24 11:57:19.333908	5
19	Pandas Dataframes	Data manipulation basics.	https://youtube.com/watch?v=py1	\N	1	2026-08-24 11:57:19.333908	6
20	NumPy Array Operations	Vectorized math in Python.	https://youtube.com/watch?v=py2	\N	2	2026-08-24 11:57:19.333908	6
21	Matplotlib Visualization	Plotting charts and graphs.	https://youtube.com/watch?v=py3	\N	3	2026-08-24 11:57:19.333908	6
22	Dart Language Basics	Variables and functions in Dart.	https://youtube.com/watch?v=fl1	\N	1	2026-08-24 11:57:19.333908	7
23	Flutter Widgets Tree	Stateless vs Stateful widgets.	https://youtube.com/watch?v=fl2	\N	2	2026-08-24 11:57:19.333908	7
24	State Management with Provider	Managing mobile state.	https://youtube.com/watch?v=fl3	\N	3	2026-08-24 11:57:19.333908	7
25	Flutter API Integration	Fetching REST data in mobile apps.	https://youtube.com/watch?v=fl4	\N	4	2026-08-24 11:57:19.333908	7
26	Network Protocols Overview	TCP/IP and OSI Model.	https://youtube.com/watch?v=sec1	\N	1	2026-08-24 11:57:19.333908	8
27	Symmetric vs Asymmetric Encryption	Cryptography basics.	https://youtube.com/watch?v=sec2	\N	2	2026-08-24 11:57:19.333908	8
28	Common Web Vulnerabilities	OWASP Top 10 introduction.	https://youtube.com/watch?v=sec3	\N	3	2026-08-24 11:57:19.333908	8
29	TypeScript Basic Types	Interfaces vs Type Aliases.	https://youtube.com/watch?v=ts1	\N	1	2026-08-24 11:57:19.333908	9
30	Generics in TypeScript	Reusable type safe logic.	https://youtube.com/watch?v=ts2	\N	2	2026-08-24 11:57:19.333908	9
31	Decorators & Metadata	Advanced meta-programming.	https://youtube.com/watch?v=ts3	\N	3	2026-08-24 11:57:19.333908	9
32	GraphQL Schema Design	Types, Queries, and Mutations.	https://youtube.com/watch?v=gql1	\N	1	2026-08-24 11:57:19.333908	10
33	Apollo Server Setup	Integrating Node with GraphQL.	https://youtube.com/watch?v=gql2	\N	2	2026-08-24 11:57:19.333908	10
34	Solving N+1 Problem	Dataloaders implementation.	https://youtube.com/watch?v=gql3	\N	3	2026-08-24 11:57:19.333908	10
35	Vue Options vs Composition API	Modern Vue syntax.	https://youtube.com/watch?v=v1	\N	1	2026-08-24 11:57:19.333908	11
36	Pinia Store Setup	State management in Vue.	https://youtube.com/watch?v=v2	\N	2	2026-08-24 11:57:19.333908	11
37	MongoDB Aggregation Pipeline	Advanced queries.	https://youtube.com/watch?v=m1	\N	1	2026-08-24 11:57:19.333908	12
38	MongoDB Indexing Strategies	Improving query speed.	https://youtube.com/watch?v=m2	\N	2	2026-08-24 11:57:19.333908	12
39	AWS EC2 Instance Setup	Deploying virtual servers.	https://youtube.com/watch?v=aws1	\N	1	2026-08-24 11:57:19.333908	13
40	AWS S3 Bucket Policies	Managing cloud storage.	https://youtube.com/watch?v=aws2	\N	2	2026-08-24 11:57:19.333908	13
41	Linear Regression in Python	Supervised learning models.	https://youtube.com/watch?v=ml1	\N	1	2026-08-24 11:57:19.333908	14
42	Decision Trees Algorithm	Classification techniques.	https://youtube.com/watch?v=ml2	\N	2	2026-08-24 11:57:19.333908	14
43	Next.js App Router	Server components vs Client components.	https://youtube.com/watch?v=next1	\N	1	2026-08-24 11:57:19.333908	15
44	Server Actions in Next.js	Handling forms without API routes.	https://youtube.com/watch?v=next2	\N	2	2026-08-24 11:57:19.333908	15
45	Redis Data Structures	Hashes, Sets, and Sorted Sets.	https://youtube.com/watch?v=red1	\N	1	2026-08-24 11:57:19.333908	16
46	Redis Pub/Sub System	Realtime messaging.	https://youtube.com/watch?v=red2	\N	2	2026-08-24 11:57:19.333908	16
47	GitHub Actions Syntax	YAML workflow files.	https://youtube.com/watch?v=gh1	\N	1	2026-08-24 11:57:19.333908	17
48	Deploying to AWS via CI/CD	Automating deployments.	https://youtube.com/watch?v=gh2	\N	2	2026-08-24 11:57:19.333908	17
49	Tailwind Utility Classes	Responsive design principles.	https://youtube.com/watch?v=tw1	\N	1	2026-08-24 11:57:19.333908	18
50	Custom Tailwind Config	Themes and plugins.	https://youtube.com/watch?v=tw2	\N	2	2026-08-24 11:57:19.333908	18
51	Go Goroutines & Channels	Concurrency in Go.	https://youtube.com/watch?v=go1	\N	1	2026-08-24 11:57:19.333908	19
52	Go Fiber Framework	Fast web applications.	https://youtube.com/watch?v=go2	\N	2	2026-08-24 11:57:19.333908	19
53	Kafka Topics & Partitions	Event streaming concepts.	https://youtube.com/watch?v=kaf1	\N	1	2026-08-24 11:57:19.333908	20
54	Kafka Producers & Consumers	Building stream apps.	https://youtube.com/watch?v=kaf2	\N	2	2026-08-24 11:57:19.333908	20
55	Angular Dependency Injection	Services and Providers.	https://youtube.com/watch?v=ng1	\N	1	2026-08-24 11:57:19.333908	21
56	Angular RxJS Observables	Reactive programming.	https://youtube.com/watch?v=ng2	\N	2	2026-08-24 11:57:19.333908	21
57	Rust Ownership Model	Borrowing and Lifetimes.	https://youtube.com/watch?v=rs1	\N	1	2026-08-24 11:57:19.333908	22
58	Rust Error Handling	Result and Option types.	https://youtube.com/watch?v=rs2	\N	2	2026-08-24 11:57:19.333908	22
59	System Design Load Balancers	Layer 4 vs Layer 7.	https://youtube.com/watch?v=sd1	\N	1	2026-08-24 11:57:19.333908	23
60	Database Sharding Strategies	Horizontal scaling.	https://youtube.com/watch?v=sd2	\N	2	2026-08-24 11:57:19.333908	23
61	Spring Controllers & Beans	Inversion of Control.	https://youtube.com/watch?v=sp1	\N	1	2026-08-24 11:57:19.333908	24
62	Spring Data JPA	ORM in Java.	https://youtube.com/watch?v=sp2	\N	2	2026-08-24 11:57:19.333908	24
63	K8s Cluster Setup	Kubeadm installation.	https://youtube.com/watch?v=k81	\N	1	2026-08-24 11:57:19.333908	25
64	K8s Helm Charts	Package management for K8s.	https://youtube.com/watch?v=k82	\N	2	2026-08-24 11:57:19.333908	25
65	Figma Components & Variants	Design system setup.	https://youtube.com/watch?v=fig1	\N	1	2026-08-24 11:57:19.333908	26
66	Figma Interactive Wireframes	Prototyping UX flow.	https://youtube.com/watch?v=fig2	\N	2	2026-08-24 11:57:19.333908	26
67	REST API Disadvantages	Over-fetching and Under-fetching.	https://youtube.com/watch?v=api1	\N	1	2026-08-24 11:57:19.333908	27
68	GraphQL Performance	Caching and Network optimization.	https://youtube.com/watch?v=api2	\N	2	2026-08-24 11:57:19.333908	27
69	Elasticsearch Ingestion	Logstash and Beats.	https://youtube.com/watch?v=es1	\N	1	2026-08-24 11:57:19.333908	28
70	Kibana Dashboards	Visualizing logs.	https://youtube.com/watch?v=es2	\N	2	2026-08-24 11:57:19.333908	28
71	Django Models & ORM	Database queries in Python.	https://youtube.com/watch?v=dj1	\N	1	2026-08-24 11:57:19.333908	29
72	Django REST Framework	Serializers and Viewsets.	https://youtube.com/watch?v=dj2	\N	2	2026-08-24 11:57:19.333908	29
73	Git Interactive Rebase	Cleaning up commit history.	https://youtube.com/watch?v=git1	\N	1	2026-08-24 11:57:19.333908	30
74	Git Flow Workflow	Branch management for teams.	https://youtube.com/watch?v=git2	\N	2	2026-08-24 11:57:19.333908	30
75	Linux File Permissions	Chmod and Chown commands.	https://youtube.com/watch?v=lin1	\N	1	2026-08-24 11:57:19.333908	31
76	Bash Scripting Automation	Cronjobs and shell automation.	https://youtube.com/watch?v=lin2	\N	2	2026-08-24 11:57:19.333908	31
77	Neural Networks Basics	Perceptrons and activation functions.	https://youtube.com/watch?v=tf1	\N	1	2026-08-24 11:57:19.333908	32
78	Convolutional Networks (CNN)	Image recognition with Keras.	https://youtube.com/watch?v=tf2	\N	2	2026-08-24 11:57:19.333908	32
79	React Native Navigation	React Navigation v6.	https://youtube.com/watch?v=rn1	\N	1	2026-08-24 11:57:19.333908	33
80	React Native Async Storage	Local offline persistence.	https://youtube.com/watch?v=rn2	\N	2	2026-08-24 11:57:19.333908	33
81	Single Responsibility Principle	SOLID design patterns.	https://youtube.com/watch?v=sol1	\N	1	2026-08-24 11:57:19.333908	34
82	Dependency Inversion	Decoupling application code.	https://youtube.com/watch?v=sol2	\N	2	2026-08-24 11:57:19.333908	34
83	AWS Lambda Triggers	Event driven serverless functions.	https://youtube.com/watch?v=sls1	\N	1	2026-08-24 11:57:19.333908	35
84	Serverless Framework Config	Deploying serverless via CLI.	https://youtube.com/watch?v=sls2	\N	2	2026-08-24 11:57:19.333908	35
85	SQL Injection Attacks	Securing backend inputs.	https://youtube.com/watch?v=eth1	\N	1	2026-08-24 11:57:19.333908	36
86	Cross Site Scripting (XSS)	Preventing malicious scripts.	https://youtube.com/watch?v=eth2	\N	2	2026-08-24 11:57:19.333908	36
87	Ansible Playbooks Syntax	YAML configurations.	https://youtube.com/watch?v=ans1	\N	1	2026-08-24 11:57:19.333908	37
88	Ansible Roles & Modules	Structuring automation.	https://youtube.com/watch?v=ans2	\N	2	2026-08-24 11:57:19.333908	37
89	Jest Mocking Functions	Unit testing APIs.	https://youtube.com/watch?v=jst1	\N	1	2026-08-24 11:57:19.333908	38
90	Snapshot Testing	Component rendering tests.	https://youtube.com/watch?v=jst2	\N	2	2026-08-24 11:57:19.333908	38
91	Jetpack Compose UI Layouts	Declarative UI in Android.	https://youtube.com/watch?v=kt1	\N	1	2026-08-24 11:57:19.333908	39
92	Kotlin Coroutines	Asynchronous Android tasks.	https://youtube.com/watch?v=kt2	\N	2	2026-08-24 11:57:19.333908	39
93	Module Federation Config	Webpack 5 microfrontends.	https://youtube.com/watch?v=mf1	\N	1	2026-08-24 11:57:19.333908	40
94	Shared State Microfrontends	Cross app communication.	https://youtube.com/watch?v=mf2	\N	2	2026-08-24 11:57:19.333908	40
95	NestJS Interceptors	Transforming response data.	https://youtube.com/watch?v=nest5	\N	5	2026-08-24 11:57:19.333908	1
96	NestJS Authentication	JWT strategy and Guards.	https://youtube.com/watch?v=nest6	\N	6	2026-08-24 11:57:19.333908	1
97	PostgreSQL Partitioning	Managing massive tables.	https://youtube.com/watch?v=pg4	\N	4	2026-08-24 11:57:19.333908	2
98	PostgreSQL Replication	Master-Slave configuration.	https://youtube.com/watch?v=pg5	\N	5	2026-08-24 11:57:19.333908	2
99	React Context API	Avoiding prop drilling.	https://youtube.com/watch?v=react5	\N	5	2026-08-24 11:57:19.333908	3
100	React Performance Optimization	useMemo and useCallback.	https://youtube.com/watch?v=react6	\N	6	2026-08-24 11:57:19.333908	3
101	Express Middleware	Request pipeline processing.	https://youtube.com/watch?v=node4	\N	4	2026-08-24 11:57:19.333908	4
102	Docker Networking	Bridge and Host networks.	https://youtube.com/watch?v=doc5	\N	5	2026-08-24 11:57:19.333908	5
103	Docker Compose Multi-container	Managing multiple services.	https://youtube.com/watch?v=doc6	\N	6	2026-08-24 11:57:19.333908	5
104	Data Cleaning in Pandas	Handling missing values.	https://youtube.com/watch?v=py4	\N	4	2026-08-24 11:57:19.333908	6
105	Flutter Custom Animations	Explicit vs Implicit animations.	https://youtube.com/watch?v=fl5	\N	5	2026-08-24 11:57:19.333908	7
106	OWASP Top 10 Deep Dive	Understanding critical risks.	https://youtube.com/watch?v=sec4	\N	4	2026-08-24 11:57:19.333908	8
107	TypeScript Mapped Types	Transforming existing types.	https://youtube.com/watch?v=ts4	\N	4	2026-08-24 11:57:19.333908	9
108	GraphQL Subscriptions	Realtime websockets with GraphQL.	https://youtube.com/watch?v=gql4	\N	4	2026-08-24 11:57:19.333908	10
109	Vue Router Setup	SPA Routing in Vue.	https://youtube.com/watch?v=v3	\N	3	2026-08-24 11:57:19.333908	11
110	MongoDB Transactions	ACID compliance in NoSQL.	https://youtube.com/watch?v=m3	\N	3	2026-08-24 11:57:19.333908	12
111	AWS DynamoDB Essentials	Single table design principles.	https://youtube.com/watch?v=aws3	\N	3	2026-08-24 11:57:19.333908	13
112	Random Forest Models	Ensemble learning methods.	https://youtube.com/watch?v=ml3	\N	3	2026-08-24 11:57:19.333908	14
113	Next.js Middleware	Edge functions & Authentication.	https://youtube.com/watch?v=next3	\N	3	2026-08-24 11:57:19.333908	15
114	Redis Sentinel vs Cluster	High availability setup.	https://youtube.com/watch?v=red3	\N	3	2026-08-24 11:57:19.333908	16
115	GitLab CI Runners	Self hosted runners configuration.	https://youtube.com/watch?v=gh3	\N	3	2026-08-24 11:57:19.333908	17
116	Tailwind Plugins	Typography and Form plugins.	https://youtube.com/watch?v=tw3	\N	3	2026-08-24 11:57:19.333908	18
117	Go Interfaces Pattern	Polymorphism in Go.	https://youtube.com/watch?v=go3	\N	3	2026-08-24 11:57:19.333908	19
118	Kafka Connect & Schema Registry	Data integration pipelines.	https://youtube.com/watch?v=kaf3	\N	3	2026-08-24 11:57:19.333908	20
119	Angular Forms Validation	Reactive vs Template forms.	https://youtube.com/watch?v=ng3	\N	3	2026-08-24 11:57:19.333908	21
120	Rust Smart Pointers	Box, Rc, and Arc types.	https://youtube.com/watch?v=rs3	\N	3	2026-08-24 11:57:19.333908	22
121	System Design Caching	CDN and In-memory caching.	https://youtube.com/watch?v=sd3	\N	3	2026-08-24 11:57:19.333908	23
122	Spring Security & JWT	Securing Spring Boot REST APIs.	https://youtube.com/watch?v=sp3	\N	3	2026-08-24 11:57:19.333908	24
123	K8s Persistent Volumes	Stateful set management.	https://youtube.com/watch?v=k83	\N	3	2026-08-24 11:57:19.333908	25
124	Figma Auto Layout	Responsive design frames.	https://youtube.com/watch?v=fig3	\N	3	2026-08-24 11:57:19.333908	26
125	GraphQL Client Caching	Apollo Client Cache policies.	https://youtube.com/watch?v=api3	\N	3	2026-08-24 11:57:19.333908	27
126	Elasticsearch Query DSL	Full text searching syntax.	https://youtube.com/watch?v=es3	\N	3	2026-08-24 11:57:19.333908	28
127	Django Authentication	Custom User models.	https://youtube.com/watch?v=dj3	\N	3	2026-08-24 11:57:19.333908	29
128	Git Stash and Clean	Temporary work preservation.	https://youtube.com/watch?v=git3	\N	3	2026-08-24 11:57:19.333908	30
129	Linux Process Management	PS, Top, and Kill commands.	https://youtube.com/watch?v=lin3	\N	3	2026-08-24 11:57:19.333908	31
130	Recurrent Neural Networks	RNNs for time series data.	https://youtube.com/watch?v=tf3	\N	3	2026-08-24 11:57:19.333908	32
131	React Native Native Modules	Bridging Swift and Java code.	https://youtube.com/watch?v=rn3	\N	3	2026-08-24 11:57:19.333908	33
132	Open/Closed Principle	Extensible system architecture.	https://youtube.com/watch?v=sol3	\N	3	2026-08-24 11:57:19.333908	34
133	AWS Step Functions	Orchestrating serverless workflows.	https://youtube.com/watch?v=sls3	\N	3	2026-08-24 11:57:19.333908	35
134	CSRF & CORS Protections	Web app security policies.	https://youtube.com/watch?v=eth3	\N	3	2026-08-24 11:57:19.333908	36
135	Ansible Vault	Managing secret parameters.	https://youtube.com/watch?v=ans3	\N	3	2026-08-24 11:57:19.333908	37
136	React Testing Library	DOM rendering test suites.	https://youtube.com/watch?v=jst3	\N	3	2026-08-24 11:57:19.333908	38
137	Kotlin ViewModel & Room	MVVM architecture in Android.	https://youtube.com/watch?v=kt3	\N	3	2026-08-24 11:57:19.333908	39
138	Microfrontends Routing	Single-SPA integration.	https://youtube.com/watch?v=mf3	\N	3	2026-08-24 11:57:19.333908	40
139	NestJS Microservices Transport	TCP and Redis transports.	https://youtube.com/watch?v=nest7	\N	7	2026-08-24 11:57:19.333908	1
140	PostgreSQL Full Text Search	TSVector and TSQuery.	https://youtube.com/watch?v=pg6	\N	6	2026-08-24 11:57:19.333908	2
141	React Server Components	Future of React architecture.	https://youtube.com/watch?v=react7	\N	7	2026-08-24 11:57:19.333908	3
142	Node.js Event Loop	Understanding asynchronous non-blocking I/O.	https://youtube.com/watch?v=node5	\N	5	2026-08-24 11:57:19.333908	4
143	K8s Security Policies	RBAC and Pod security standards.	https://youtube.com/watch?v=doc7	\N	7	2026-08-24 11:57:19.333908	5
144	Machine Learning Model Evaluation	Precision, Recall, and F1 Score.	https://youtube.com/watch?v=ml4	\N	4	2026-08-24 11:57:19.333908	14
145	gsgsdgsgf	fgsdfgssdgsgs	https://www.youtube.com/watch?v=euOD2T7Yg7M	\N	0	2026-08-24 15:36:17.247666	1
147	dvadvavwefewefqwe	dvadvawefqwefqe	https://www.youtube.com/watch?v=euOD2T7Yg7M&t=1s	\N	0	2026-08-25 11:47:24.018528	41
148	fwewef	fqwfwq	https://www.youtube.com/watch?v=euOD2T7Yg7M&t=2s	\N	0	2026-08-25 11:49:39.479718	41
149	hgdfgrgsgsd	gdfgdfgsdgss	https://www.youtube.com/watch?v=euOD2T7Yg7M&t=1787s	\N	0	2026-08-27 10:51:10.922405	42
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notification (id, message, type, "isRead", "createdAt", "userId") FROM stdin;
73	Ali Hassan has completed your course "Flutter Mobile Apps"	certificate	f	2026-08-27 14:26:37.207485	4
10	A new student has enrolled in your course "ReactJS for Beginners"!	enrollment	f	2026-08-24 12:15:54.055275	2
12	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.399668	21
13	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.405574	22
14	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.407675	42
15	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.409892	62
16	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.412652	81
17	New lesson "gsgsdgsgf" has been added to your course!	lesson	f	2026-08-24 15:36:17.415563	102
87	A new student has enrolled in your course "Flutter Mobile Apps"!	enrollment	f	2026-08-28 11:12:31.421907	4
89	Ali Hassan has completed your course "Flutter Mobile Apps"	certificate	f	2026-08-28 11:12:53.228528	4
22	A new student has enrolled in your course "Introduction to NestJS"!	enrollment	f	2026-08-25 10:54:18.34471	1
92	A new student has enrolled in your course "Flutter Mobile Apps"!	enrollment	f	2026-08-28 11:20:46.896824	4
26	Ali Hassan has completed your course "Introduction to NestJS" 	certificate	f	2026-08-25 12:19:36.99366	1
94	Ali Hassan has completed your course "Flutter Mobile Apps"	certificate	f	2026-08-28 13:16:17.506361	4
28	Ali Hassan has completed your course "Advanced PostgreSQL" 	certificate	f	2026-08-25 13:21:56.76545	1
96	Ali Hassan has completed your course "Advanced PostgreSQL"	certificate	f	2026-08-28 13:16:38.611513	1
98	A new student has enrolled in your course "Python for Data Science"!	enrollment	f	2026-08-28 13:16:55.491609	3
100	Ali Hassan has completed your course "Python for Data Science"	certificate	f	2026-08-28 13:17:04.973358	3
35	A new student has enrolled in your course "Introduction to NestJS"!	enrollment	f	2026-08-25 13:32:05.3439	1
102	A new student has enrolled in your course "Tailwind CSS Masterclass"!	enrollment	f	2026-08-28 13:20:13.282082	9
40	Ali Hassan has completed your course "Introduction to NestJS"	certificate	f	2026-08-25 13:35:51.243287	1
104	A new student has enrolled in your course "Introduction to NestJS"!	enrollment	f	2026-08-28 13:20:24.274452	1
43	A new student has enrolled in your course "Advanced PostgreSQL"!	enrollment	f	2026-08-25 13:38:57.283233	1
107	A new student has enrolled in your course "Introduction to NestJS"!	enrollment	f	2026-08-28 13:20:44.31381	1
48	A new student has enrolled in your course "Cybersecurity Fundamentals"!	enrollment	f	2026-08-25 13:41:20.817554	4
54	A new student has enrolled in your course "Introduction to NestJS"!	enrollment	f	2026-08-25 13:59:35.649752	1
56	A new student has enrolled in your course "Advanced PostgreSQL"!	enrollment	f	2026-08-25 14:00:09.735155	1
59	Ali Hassan has completed your course "Advanced PostgreSQL"	certificate	f	2026-08-27 10:21:35.918196	1
62	A new student has enrolled in your course "Advanced PostgreSQL"!	enrollment	f	2026-08-27 10:45:22.21085	1
70	A new student has enrolled in your course "Flutter Mobile Apps"!	enrollment	f	2026-08-27 10:52:19.840865	4
71	Ali Hassan has submitted a 5-star review for your course.	review	f	2026-08-27 11:09:33.854897	4
115	A new student has enrolled in your course "Elasticsearch Analytics"!	enrollment	f	2026-08-28 13:21:19.485069	14
110	A new student has enrolled in your course "Elasticsearch Analytics"!	enrollment	f	2026-08-28 13:21:08.89765	14
112	Ali Hassan has completed your course "Elasticsearch Analytics"	certificate	f	2026-08-28 13:21:13.012856	14
118	A new student has enrolled in your course "Tailwind CSS Masterclass"!	enrollment	f	2026-08-28 13:23:21.867874	9
119	Anum Khalid Ali  has completed your course "MongoDB & NoSQL"	certificate	f	2026-08-28 13:25:05.120236	6
120	Congratulations! You have completed "MongoDB & NoSQL"	certificate	f	2026-08-28 13:25:05.120229	27
121	Congratulations! You have completed "Vue.js 3 Complete Guide"	certificate	f	2026-08-28 13:26:44.207478	27
122	Anum Rashid Ali  has completed your course "Vue.js 3 Complete Guide"	certificate	f	2026-08-28 13:26:44.207484	6
124	Ali Hassan has completed your course "Tailwind CSS Masterclass"	certificate	f	2026-08-28 15:08:35.830994	9
123	Congratulations! You have completed "Tailwind CSS Masterclass"	certificate	t	2026-08-28 15:08:35.830929	201
\.


--
-- Data for Name: progress; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.progress (id, "completedAt", "enrollmentId", "lessonId") FROM stdin;
1	2026-08-24 11:57:53.308718	1	1
2	2026-08-24 11:57:53.308718	1	2
3	2026-08-24 11:57:53.308718	1	3
4	2026-08-24 11:57:53.308718	1	4
5	2026-08-24 11:57:53.308718	2	5
6	2026-08-24 11:57:53.308718	3	1
7	2026-08-24 11:57:53.308718	3	2
8	2026-08-24 11:57:53.308718	3	3
9	2026-08-24 11:57:53.308718	4	8
10	2026-08-24 11:57:53.308718	4	9
11	2026-08-24 11:57:53.308718	4	10
12	2026-08-24 11:57:53.308718	4	11
13	2026-08-24 11:57:53.308718	5	5
14	2026-08-24 11:57:53.308718	5	6
15	2026-08-24 11:57:53.308718	5	7
16	2026-08-24 11:57:53.308718	7	15
17	2026-08-24 11:57:53.308718	7	16
18	2026-08-24 11:57:53.308718	7	17
19	2026-08-24 11:57:53.308718	7	18
20	2026-08-24 11:57:53.308718	9	22
21	2026-08-24 11:57:53.308718	9	23
22	2026-08-24 11:57:53.308718	9	24
23	2026-08-24 11:57:53.308718	9	25
24	2026-08-24 11:57:53.308718	10	26
25	2026-08-24 11:57:53.308718	10	27
26	2026-08-24 11:57:53.308718	10	28
27	2026-08-24 11:57:53.308718	11	29
28	2026-08-24 11:57:53.308718	11	30
29	2026-08-24 11:57:53.308718	11	31
30	2026-08-24 11:57:53.308718	13	35
31	2026-08-24 11:57:53.308718	13	36
32	2026-08-24 11:57:53.308718	14	37
33	2026-08-24 11:57:53.308718	14	38
34	2026-08-24 11:57:53.308718	15	39
35	2026-08-24 11:57:53.308718	15	40
36	2026-08-24 11:57:53.308718	17	43
37	2026-08-24 11:57:53.308718	17	44
38	2026-08-24 11:57:53.308718	19	47
39	2026-08-24 11:57:53.308718	19	48
40	2026-08-24 11:57:53.308718	20	49
41	2026-08-24 11:57:53.308718	20	50
42	2026-08-24 11:57:53.308718	22	53
43	2026-08-24 11:57:53.308718	23	55
44	2026-08-24 11:57:53.308718	23	56
45	2026-08-24 11:57:53.308718	25	59
46	2026-08-24 11:57:53.308718	25	60
47	2026-08-24 11:57:53.308718	26	61
48	2026-08-24 11:57:53.308718	26	62
49	2026-08-24 11:57:53.308718	27	63
50	2026-08-24 11:57:53.308718	27	64
51	2026-08-24 11:57:53.308718	28	65
52	2026-08-24 11:57:53.308718	28	66
53	2026-08-24 11:57:53.308718	29	67
54	2026-08-24 11:57:53.308718	29	68
55	2026-08-24 11:57:53.308718	31	71
56	2026-08-24 11:57:53.308718	31	72
57	2026-08-24 11:57:53.308718	33	75
58	2026-08-24 11:57:53.308718	33	76
59	2026-08-24 11:57:53.308718	35	79
60	2026-08-24 11:57:53.308718	35	80
61	2026-08-24 11:57:53.308718	37	83
62	2026-08-24 11:57:53.308718	37	84
63	2026-08-24 11:57:53.308718	39	87
64	2026-08-24 11:57:53.308718	39	88
65	2026-08-24 11:57:53.308718	40	89
66	2026-08-24 11:57:53.308718	40	90
67	2026-08-24 11:57:53.308718	41	91
68	2026-08-24 11:57:53.308718	41	92
69	2026-08-24 11:57:53.308718	43	1
70	2026-08-24 11:57:53.308718	43	2
71	2026-08-24 11:57:53.308718	43	3
72	2026-08-24 11:57:53.308718	43	4
73	2026-08-24 11:57:53.308718	44	8
74	2026-08-24 11:57:53.308718	44	9
75	2026-08-24 11:57:53.308718	44	10
76	2026-08-24 11:57:53.308718	44	11
77	2026-08-24 11:57:53.308718	46	15
78	2026-08-24 11:57:53.308718	46	16
79	2026-08-24 11:57:53.308718	46	17
80	2026-08-24 11:57:53.308718	46	18
81	2026-08-24 11:57:53.308718	47	12
82	2026-08-24 11:57:53.308718	47	13
83	2026-08-24 11:57:53.308718	47	14
84	2026-08-24 11:57:53.308718	49	19
85	2026-08-24 11:57:53.308718	49	20
86	2026-08-24 11:57:53.308718	49	21
87	2026-08-24 11:57:53.308718	50	26
88	2026-08-24 11:57:53.308718	50	27
89	2026-08-24 11:57:53.308718	50	28
90	2026-08-24 11:57:53.308718	52	35
91	2026-08-24 11:57:53.308718	52	36
92	2026-08-24 11:57:53.308718	53	32
93	2026-08-24 11:57:53.308718	53	33
94	2026-08-24 11:57:53.308718	53	34
95	2026-08-24 11:57:53.308718	54	39
96	2026-08-24 11:57:53.308718	54	40
97	2026-08-24 11:57:53.308718	56	41
98	2026-08-24 11:57:53.308718	56	42
99	2026-08-24 11:57:53.308718	57	47
100	2026-08-24 11:57:53.308718	57	48
101	2026-08-24 11:57:53.308718	58	49
102	2026-08-24 11:57:53.308718	58	50
103	2026-08-24 11:57:53.308718	60	53
104	2026-08-24 11:57:53.308718	60	54
105	2026-08-24 11:57:53.308718	61	57
106	2026-08-24 11:57:53.308718	61	58
107	2026-08-24 11:57:53.308718	62	59
108	2026-08-24 11:57:53.308718	62	60
109	2026-08-24 11:57:53.308718	63	63
110	2026-08-24 11:57:53.308718	63	64
111	2026-08-24 11:57:53.308718	64	65
112	2026-08-24 11:57:53.308718	64	66
113	2026-08-24 11:57:53.308718	65	69
114	2026-08-24 11:57:53.308718	65	70
115	2026-08-24 11:57:53.308718	67	73
116	2026-08-24 11:57:53.308718	67	74
117	2026-08-24 11:57:53.308718	68	75
118	2026-08-24 11:57:53.308718	68	76
119	2026-08-24 11:57:53.308718	69	79
120	2026-08-24 11:57:53.308718	69	80
121	2026-08-24 11:57:53.308718	71	83
122	2026-08-24 11:57:53.308718	71	84
123	2026-08-24 11:57:53.308718	73	87
124	2026-08-24 11:57:53.308718	73	88
125	2026-08-24 11:57:53.308718	75	1
126	2026-08-24 11:57:53.308718	75	2
127	2026-08-24 11:57:53.308718	75	3
128	2026-08-24 11:57:53.308718	75	4
129	2026-08-24 11:57:53.308718	77	5
130	2026-08-24 11:57:53.308718	77	6
131	2026-08-24 11:57:53.308718	77	7
132	2026-08-24 11:57:53.308718	79	8
133	2026-08-24 11:57:53.308718	79	9
134	2026-08-24 11:57:53.308718	79	10
135	2026-08-24 11:57:53.308718	79	11
136	2026-08-24 11:57:53.308718	81	22
137	2026-08-24 11:57:53.308718	81	23
138	2026-08-24 11:57:53.308718	81	24
139	2026-08-24 11:57:53.308718	81	25
140	2026-08-24 11:57:53.308718	83	26
141	2026-08-24 11:57:53.308718	83	27
142	2026-08-24 11:57:53.308718	83	28
143	2026-08-24 11:57:53.308718	85	35
144	2026-08-24 11:57:53.308718	85	36
145	2026-08-24 11:57:53.308718	87	37
146	2026-08-24 11:57:53.308718	87	38
147	2026-08-24 11:57:53.308718	89	39
148	2026-08-24 11:57:53.308718	89	40
149	2026-08-24 11:57:53.308718	91	47
150	2026-08-24 11:57:53.308718	91	48
189	2026-08-27 10:45:25.450997	214	5
190	2026-08-27 10:45:26.722398	214	6
191	2026-08-27 10:45:28.16353	214	7
206	2026-08-28 11:20:48.741123	222	22
207	2026-08-28 11:20:50.073611	222	23
208	2026-08-28 11:20:50.908718	222	24
209	2026-08-28 13:16:16.650575	222	25
210	2026-08-28 13:16:17.481174	222	105
211	2026-08-28 13:16:37.508708	214	97
212	2026-08-28 13:16:37.912549	214	98
213	2026-08-28 13:16:38.39432	214	140
214	2026-08-28 13:17:01.792137	223	19
215	2026-08-28 13:17:02.855395	223	20
216	2026-08-28 13:17:03.71419	223	21
217	2026-08-28 13:17:04.944094	223	104
226	2026-08-28 13:23:23.374892	229	49
227	2026-08-28 13:25:05.06288	14	110
228	2026-08-28 13:26:44.184519	13	109
229	2026-08-28 15:08:34.165403	229	50
230	2026-08-28 15:08:35.798324	229	116
\.


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz (id, title, "passingScore", "courseId") FROM stdin;
1	NestJS Basics Quiz	70	1
2	Postgres Fundamentals Quiz	60	2
3	React Concepts Assessment	70	3
4	Node Microservices Quiz	75	4
5	Docker & K8s Certification Practice	80	5
6	Python Data Science Test	65	6
7	Flutter UI Knowledge Test	70	7
8	Cybersecurity Exam	80	8
9	TypeScript Advanced Quiz	75	9
10	GraphQL Schema Exam	70	10
11	Vue 3 Fundamentals	65	11
12	MongoDB Aggregations Test	75	12
13	AWS Essentials Quiz	80	13
14	Machine Learning Concepts	70	14
15	Next.js Fullstack Test	75	15
16	Redis Caching Quiz	70	16
17	CI/CD Pipelines Test	80	17
18	Tailwind CSS Quiz	60	18
19	Go Concurrency Test	75	19
20	Kafka Event Streaming Quiz	80	20
21	Angular Fundamentals	70	21
22	Rust Memory Safety Exam	85	22
23	System Design Architecture Test	80	23
24	Spring Boot Backend Quiz	70	24
25	Kubernetes Administration Test	85	25
26	Figma UI/UX Quiz	60	26
27	GraphQL vs REST Exam	70	27
28	Elasticsearch DSL Test	75	28
29	Django ORM Quiz	70	29
30	Git Version Control Exam	65	30
31	Linux Sysadmin Test	75	31
32	TensorFlow Neural Nets Quiz	80	32
33	React Native Basics	70	33
34	SOLID Principles Exam	80	34
35	Serverless AWS Test	75	35
36	Ethical Hacking Exam	85	36
37	Ansible Playbooks Quiz	70	37
38	Jest TDD Quiz	70	38
39	Kotlin Jetpack Compose Test	75	39
40	Microfrontends Exam	80	40
42	gfssags	70	42
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.question (id, text, options, "correctAnswerIndex", "quizId") FROM stdin;
1	What does DI stand for in NestJS?	Dependency Injection,Data Interface,Direct Input	0	1
2	Which pipe is built-in NestJS?	ValidationPipe,CheckPipe,DataPipe	0	1
3	Which command starts Postgres CLI?	pg_start,psql,postgres	1	2
4	What index type is default in Postgres?	B-Tree,Hash,GIN	0	2
5	What Hook replaces lifecycle methods in React?	useEffect,useState,useMemo	0	3
6	Virtual DOM is faster because it minimizes direct DOM updates.	True,False	0	3
7	Which protocol is commonly used for message queues?	AMQP,HTTP,FTP	0	4
8	What tool handles container orchestration?	Kubernetes,Docker Desktop,Git	0	5
9	Which library is used for DataFrames in Python?	Pandas,NumPy,Scipy	0	6
10	Flutter uses which programming language?	Dart,Java,JavaScript	0	7
11	What does OWASP stand for?	Open Web Application Security Project,Online Web App Safety Protocol	0	8
12	TypeScript is a superset of which language?	JavaScript,Java,C#	0	9
13	Which HTTP method is used by default in GraphQL queries?	POST,GET,PUT	0	10
14	What is Pinia used for in Vue 3?	State Management,Routing,CSS Styling	0	11
15	MongoDB stores data in which format?	BSON,XML,Plain Text	0	12
16	Which AWS service is used for virtual server hosting?	EC2,S3,RDS	0	13
17	Supervised learning requires labeled training data.	True,False	0	14
18	Next.js App Router relies on which React feature?	Server Components,Context API	0	15
19	Redis stores data primarily where?	In-Memory,Hard Disk,Cloud S3	0	16
20	CI/CD stands for Continuous Integration and Continuous ___?	Deployment,Development,Delivery	0	17
21	Tailwind CSS uses utility classes.	True,False	0	18
22	Go concurrency is handled via what mechanism?	Goroutines,Threads,Async-Await	0	19
23	Kafka stores messages in what abstraction?	Topics,Tables,Buckets	0	20
24	Which decorator defines an Angular component?	@Component,@Injectable,@Directive	0	21
25	Rust guarantees memory safety without a garbage collector.	True,False	0	22
26	What component routes traffic across servers?	Load Balancer,Database,Cache	0	23
27	Which annotation is used for Spring Controllers?	@RestController,@Service,@Entity	0	24
28	What is Helm in Kubernetes?	Package Manager,Monitoring Tool,Ingress Controller	0	25
29	Figma is primarily a vector design tool.	True,False	0	26
30	GraphQL avoids over-fetching data.	True,False	0	27
31	Elasticsearch is based on which search library?	Apache Lucene,Solr,Sphinx	0	28
32	Django ORM maps models to database tables.	True,False	0	29
33	Which Git command combines commit histories?	git rebase,git status,git add	0	30
34	Command to change file permissions in Linux?	chmod,chown,ls	0	31
35	TensorFlow is developed primarily by which company?	Google,Meta,Microsoft	0	32
36	React Native compiles to native components.	True,False	0	33
37	The "S" in SOLID stands for Single Responsibility.	True,False	0	34
38	AWS Lambda charges based on compute execution time.	True,False	0	35
39	XSS stands for Cross Site Scripting.	True,False	0	36
40	Ansible playbooks are written in YAML.	True,False	0	37
41	Jest is used for frontend and backend testing in JS.	True,False	0	38
42	Jetpack Compose is a declarative UI toolkit.	True,False	0	39
43	Module Federation is supported natively by Webpack 5.	True,False	0	40
44	NestJS modules are annotated with @Module.	True,False	0	1
45	PostgreSQL supports JSONB column types.	True,False	0	2
46	React Props are immutable.	True,False	0	3
47	RabbitMQ uses Exchanges to route messages.	True,False	0	4
48	A Dockerfile defines container building steps.	True,False	0	5
49	NumPy arrays are faster than Python native lists.	True,False	0	6
50	Stateless widgets in Flutter re-render automatically on internal state change.	False,True	0	7
51	Asymmetric encryption uses two keys: public and private.	True,False	0	8
52	TypeScript compiles down to JavaScript.	True,False	0	9
53	GraphQL Apollo Server handles request schemas.	True,False	0	10
54	Vue 3 supports Composition API.	True,False	0	11
55	AWS S3 stores object data.	True,False	0	13
56	Redis can be used as a Pub/Sub message broker.	True,False	0	16
57	Go is a statically typed language.	True,False	0	19
58	Angular uses RxJS for reactive data handling.	True,False	0	21
59	Rust uses ownership to manage memory.	True,False	0	22
60	Git commit creates a new snapshot.	True,False	0	30
62	gagasgs	gdsagas,sgadasa	0	42
\.


--
-- Data for Name: quiz_attempt; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz_attempt (id, score, "totalQuestions", passed, "attemptedAt", "enrollmentId", "quizId") FROM stdin;
1	2	2	t	2026-08-24 12:07:48.826822	1	1
2	1	2	f	2026-08-24 12:07:48.826822	2	2
3	2	2	t	2026-08-24 12:07:48.826822	3	1
4	2	2	t	2026-08-24 12:07:48.826822	4	3
5	2	2	t	2026-08-24 12:07:48.826822	5	2
6	1	2	f	2026-08-24 12:07:48.826822	6	4
7	2	2	t	2026-08-24 12:07:48.826822	7	5
8	1	2	f	2026-08-24 12:07:48.826822	8	6
9	2	2	t	2026-08-24 12:07:48.826822	9	7
10	2	2	t	2026-08-24 12:07:48.826822	10	8
11	2	2	t	2026-08-24 12:07:48.826822	11	9
12	0	2	f	2026-08-24 12:07:48.826822	12	10
13	2	2	t	2026-08-24 12:07:48.826822	13	11
14	2	2	t	2026-08-24 12:07:48.826822	14	12
15	2	2	t	2026-08-24 12:07:48.826822	15	13
16	1	2	f	2026-08-24 12:07:48.826822	16	14
17	2	2	t	2026-08-24 12:07:48.826822	17	15
18	2	2	t	2026-08-24 12:07:48.826822	18	16
19	2	2	t	2026-08-24 12:07:48.826822	19	17
20	2	2	t	2026-08-24 12:07:48.826822	20	18
21	2	2	t	2026-08-24 12:07:48.826822	22	20
22	2	2	t	2026-08-24 12:07:48.826822	23	21
23	2	2	t	2026-08-24 12:07:48.826822	25	23
24	2	2	t	2026-08-24 12:07:48.826822	26	24
25	2	2	t	2026-08-24 12:07:48.826822	27	25
26	2	2	t	2026-08-24 12:07:48.826822	29	27
27	2	2	t	2026-08-24 12:07:48.826822	30	28
28	2	2	t	2026-08-24 12:07:48.826822	31	29
29	2	2	t	2026-08-24 12:07:48.826822	33	31
30	2	2	t	2026-08-24 12:07:48.826822	34	32
31	2	2	t	2026-08-24 12:07:48.826822	35	33
32	2	2	t	2026-08-24 12:07:48.826822	37	35
33	2	2	t	2026-08-24 12:07:48.826822	38	36
34	2	2	t	2026-08-24 12:07:48.826822	39	37
35	2	2	t	2026-08-24 12:07:48.826822	40	38
36	2	2	t	2026-08-24 12:07:48.826822	41	39
37	2	2	t	2026-08-24 12:07:48.826822	42	40
38	2	2	t	2026-08-24 12:07:48.826822	43	1
39	2	2	t	2026-08-24 12:07:48.826822	44	3
40	2	2	t	2026-08-24 12:07:48.826822	46	5
41	2	2	t	2026-08-24 12:07:48.826822	47	4
42	2	2	t	2026-08-24 12:07:48.826822	49	6
43	2	2	t	2026-08-24 12:07:48.826822	50	8
44	2	2	t	2026-08-24 12:07:48.826822	52	5
45	2	2	t	2026-08-24 12:07:48.826822	53	10
46	2	2	t	2026-08-24 12:07:48.826822	54	11
47	2	2	t	2026-08-24 12:07:48.826822	56	13
48	2	2	t	2026-08-24 12:07:48.826822	57	15
49	2	2	t	2026-08-24 12:07:48.826822	58	17
50	2	2	t	2026-08-24 12:07:48.826822	60	19
53	1	3	f	2026-08-27 12:12:50.047316	214	2
54	1	3	f	2026-08-27 12:13:03.578545	214	2
55	2	3	t	2026-08-27 12:13:14.041599	214	2
56	1	3	f	2026-08-27 12:13:34.733989	214	2
57	2	2	t	2026-08-28 11:38:24.247453	222	7
58	1	1	t	2026-08-28 13:28:49.622569	218	42
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.review (id, rating, comment, reviewdate, "enrollmentId") FROM stdin;
1	5	Excellent NestJS course, learned a lot about dependency injection!	2026-08-24 12:08:29.004273	1
2	4	Good Postgres deep dive, but could use more query examples.	2026-08-24 12:08:29.004273	2
3	5	ReactJS basics were explained crystal clear!	2026-08-24 12:08:29.004273	4
4	5	Microservices concepts made simple with RabbitMQ.	2026-08-24 12:08:29.004273	6
5	5	Docker and K8s content is top notch.	2026-08-24 12:08:29.004273	7
6	4	Python Data Science course was helpful for my job.	2026-08-24 12:08:29.004273	8
7	5	Loved the Flutter UI animations section!	2026-08-24 12:08:29.004273	9
8	5	Very informative security course.	2026-08-24 12:08:29.004273	10
9	4	Great TypeScript course, deep topics covered.	2026-08-24 12:08:29.004273	11
10	5	GraphQL implementation section was super practical.	2026-08-24 12:08:29.004273	13
11	5	Vue 3 with Pinia explanation was awesome.	2026-08-24 12:08:29.004273	14
12	4	MongoDB aggregations are now clear to me.	2026-08-24 12:08:29.004273	15
13	5	AWS architecture course helped me pass my certification!	2026-08-24 12:08:29.004273	17
14	5	Next.js App Router section is up to date and clean.	2026-08-24 12:08:29.004273	19
15	5	Redis caching strategies explained thoroughly.	2026-08-24 12:08:29.004273	20
16	4	CI/CD pipeline setup guide was extremely useful.	2026-08-24 12:08:29.004273	21
17	5	Go concurrency with goroutines was amazing.	2026-08-24 12:08:29.004273	22
18	5	Angular enterprise patterns helped at my workplace.	2026-08-24 12:08:29.004273	23
19	5	Rust memory model was simplified very nicely.	2026-08-24 12:08:29.004273	25
20	5	System Design course is a must-watch for interviews!	2026-08-24 12:08:29.004273	26
\.


--
-- Name: assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assignment_id_seq', 42, true);


--
-- Name: assignment_submission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assignment_submission_id_seq', 32, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_id_seq', 28, true);


--
-- Name: certificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.certificate_id_seq', 26, true);


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.course_id_seq', 42, true);


--
-- Name: enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.enrollment_id_seq', 229, true);


--
-- Name: lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lesson_id_seq', 149, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notification_id_seq', 124, true);


--
-- Name: progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.progress_id_seq', 230, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.question_id_seq', 62, true);


--
-- Name: quiz_attempt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_attempt_id_seq', 58, true);


--
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_id_seq', 42, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.review_id_seq', 23, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 202, true);


--
-- PostgreSQL database dump complete
--

\unrestrict GtS2RiLvkN0faaa0yadDZPThO2ae0SjN1u1OyQLk1fDV44NsEvAOJfhdw4rWVBH

