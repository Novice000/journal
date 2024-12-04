from app.models import User, Entries, Task
import random

names = ["efemena", 
        "maxwell",
        "osita",
        "favour",
        "praise",
        "esgebue",
        "mark",
        "john",
        "james",
        "precious"]

users = []
for name in names:
    user = User.objects.create(username=name, password="password123", email=f"${name}@gmail.com")
    users.append(user)
    
raw_tasks = [
    {"task": "Complete homework", "completed": False},
    {"task": "Buy groceries", "completed": False},
    {"task": "Read a book", "completed": True},
    {"task": "Attend meeting at 3 PM", "completed": False},
    {"task": "Clean the house", "completed": True},
    {"task": "Call mom", "completed": False},
    {"task": "Finish project report", "completed": False},
    {"task": "Exercise for 30 minutes", "completed": True},
    {"task": "Update resume", "completed": False},
    {"task": "Pay utility bills", "completed": True},
    {"task": "Schedule dentist appointment", "completed": False},
    {"task": "Organize office files", "completed": False},
    {"task": "Take out the trash", "completed": True},
    {"task": "Prepare dinner", "completed": True},
    {"task": "Write blog post", "completed": False},
    {"task": "Check emails", "completed": True},
    {"task": "Complete online course module", "completed": False},
    {"task": "Plan weekend trip", "completed": False},
    {"task": "Buy a gift for friend’s birthday", "completed": True},
    {"task": "Water the plants", "completed": False}
]

texts = [
    "Today I worked on completing the tasks that were assigned to me for the day. It was a busy morning with multiple meetings, but I managed to check off everything on my to-do list. I started with the most urgent tasks and then focused on the smaller ones to clear my schedule for tomorrow. The day felt productive, though I could have used a bit more focus in the afternoon as I felt a bit distracted by personal matters.",
    
    "I spent the afternoon preparing for the upcoming presentation on Friday. I reviewed the slides and made sure that all the key points were included. I also practiced delivering the presentation, making sure to time myself to ensure I wouldn’t go over the allotted time. There’s still a bit of work to do in refining my delivery, but overall, I’m feeling confident about it.",
    
    "After the meeting, I took some time to review the feedback I received from the last meeting. I noted down the suggestions for improvement and set aside some time to work on them. While the feedback was positive, there were a few points that I need to focus on in order to deliver better results next time. I’ll make sure to address those points before the next meeting.",
    
    "This evening, I set aside some time to catch up on the chapters for the book club. I finished reading the assigned chapters and took some notes on the key themes that we’ll discuss. The book is getting more interesting as we progress, and I’m looking forward to hearing everyone’s thoughts during our next meeting. I also thought about how the book’s themes relate to some current events, which could lead to some interesting discussion points.",
    
    "I spent some time this afternoon following up with the client regarding the proposal we sent last week. They had a few questions about the pricing structure, and I addressed their concerns by explaining the breakdown in more detail. I also reassured them about our commitment to providing quality service. I’ll need to wait for their final decision, but I feel good about how the conversation went.",
    
    "In the morning, I organized the team's schedule for next week. I ensured that all the major projects were assigned and that there were no overlapping deadlines. Some team members requested adjustments, so I was able to make those changes without too much disruption. It feels good to have everything planned out, and I’m optimistic about the upcoming week’s progress.",
    
    "I dedicated some time this afternoon to updating the database with the latest entries. It was a straightforward task, though there were a few inconsistencies in the data that needed to be corrected. I ran some queries to identify the errors, and now the database is in a much better state. I’ll need to review it again next week to ensure everything is up-to-date.",
    
    "The team met today to plan the marketing strategy for the new product launch. We brainstormed ideas for social media campaigns and discussed how to position the product in the market. Everyone contributed great ideas, and we came up with a solid plan that we can refine over the next few weeks. I’m excited to see how the strategy unfolds and how it will drive interest in the product.",
    
    "I spent the evening working on the final draft of my research paper. I reviewed the key sections and refined some of my arguments. The paper is almost complete, but I still need to revise the conclusion and ensure the flow between paragraphs is smooth. I feel like it’s almost ready to be submitted, but I want to give it another thorough review before that.",
    
    "This morning, I spent some time cleaning and organizing the office space in preparation for the new team member starting next week. I rearranged the desks and made sure everything was in order so they would have a welcoming and functional workspace. It feels nice to have the office in order, and I’m looking forward to meeting the new team member and getting them settled in."
]

reviews = [
    "Tasks were completed on time, but some feedback needs attention.",
    "Presentation needs more visual aids and practice.",
    "Feedback was positive; implement suggested changes.",
    "Book club meeting was engaging; everyone finished the reading.",
    "Client has concerns regarding the pricing, need to adjust proposal.",
    "Team's schedule is set; a few changes expected next week.",
    "Database update was successful; some entries need revision.",
    "Marketing strategy is shaping up well; need more market research.",
    "Research paper draft is nearly done, requires final revisions.",
    "Office setup is complete; ready for new team member."
]

for user in users:
    task_int  = random.randint(1,5)
    random_task = random.choice(raw_tasks,task_int)
    entry = Entries.object.create(user=user,text=random.choice(texts),reviews=random.choice(reviews))
    for task in random_task:
        T = Task(**task)
        entry.tasks.append(T)
        
    entry.save()
        
    
    
