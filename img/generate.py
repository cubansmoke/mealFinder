import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_filename = "Meal_Finder_Document.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.black,
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#333333'),
        spaceAfter=15
    )

    h2_style = ParagraphStyle(
        'H2Title',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.black,
        spaceAfter=10
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#444444')
    )

    step_style = ParagraphStyle(
        'StepText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#222222'),
        spaceAfter=8
    )

    story = []

    # ---------------------------------------------------------
    # PAGE 1: Banner & Search Interface (1.jpg)
    # ---------------------------------------------------------
    story.append(Paragraph("Meal Finder", title_style))
    story.append(Paragraph("<b>GitHub Repo:</b> https://github.com/cubansmoke/mealFinder", subtitle_style))
    story.append(Spacer(1, 10))
    
    if os.path.exists("1.jpg"):
        story.append(Image("1.jpg", width=540, height=270))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 2: Categories (6.jpg & 2.jpg)
    # ---------------------------------------------------------
    story.append(Paragraph("Food Categories", h2_style))
    story.append(Spacer(1, 10))
    
    if os.path.exists("6.jpg"):
        story.append(Image("6.jpg", width=540, height=270))
    
    story.append(Spacer(1, 15))
    if os.path.exists("2.jpg"):
        story.append(Image("2.jpg", width=540, height=270))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 3: Category Overview (3.jpg)
    # ---------------------------------------------------------
    story.append(Paragraph("Chicken Meals", h2_style))
    story.append(Paragraph(
        "Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. "
        "It is one of the most common and widespread domestic animals, with a total population "
        "of more than 19 billion as of 2011. Humans commonly keep chickens as a source of food "
        "(consuming both their meat and eggs) and, more rarely, as pets.",
        body_style
    ))
    story.append(Spacer(1, 15))
    
    if os.path.exists("3.jpg"):
        story.append(Image("3.jpg", width=540, height=270))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 4: Recipe Detail & Ingredients (4.jpg)
    # ---------------------------------------------------------
    story.append(Paragraph("Chicken Alfredo Primavera", title_style))
    story.append(Paragraph("<b>Category:</b> Chicken &nbsp;&nbsp;|&nbsp;&nbsp; <b>Area:</b> Italian", subtitle_style))
    story.append(Spacer(1, 10))

    if os.path.exists("4.jpg"):
        story.append(Image("4.jpg", width=540, height=270))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 5: Recipe Instructions (5.jpg)
    # ---------------------------------------------------------
    story.append(Paragraph("Instructions", h2_style))
    story.append(Spacer(1, 10))

    if os.path.exists("5.jpg"):
        story.append(Image("5.jpg", width=540, height=270))
    
    story.append(Spacer(1, 15))
    
    instructions = [
        "<b>1.</b> Cut each chicken breast in about 3 pieces, so that it cooks faster and put it in a small pot. Pour Enchilada sauce over it and cook covered on low to medium heat until chicken is cooked through, about 20 minutes.",
        "<b>2.</b> Remove chicken from the pot and shred with two forks.",
        "<b>3.</b> Preheat oven to 375 F degrees.",
        "<b>4.</b> Start layering the casserole with sauce, tortillas, chicken, and cheese.",
        "<b>5.</b> Bake for 20 to 30 minutes uncovered, until bubbly and cheese has melted.",
        "<b>6.</b> Serve warm."
    ]

    for step in instructions:
        story.append(Paragraph(step, step_style))

    # Build PDF
    doc.build(story)

if __name__ == "__main__":
    build_pdf()