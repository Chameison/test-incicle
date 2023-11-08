interface Data {
    data: [Board]
  }
  
  interface Board {
    title: string
    boards: ResumeFile[]
  }
  
  interface ResumeFile {
    file: string
  }