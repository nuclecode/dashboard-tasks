//import dbConnect from '@/lib/dbConnect';
//import Entry from '@/models/Entry';

import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the data file
const dataFilePath = path.join(process.cwd(), 'data.json');

// Function to handle the API route
export async function GET(req) {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const entries = JSON.parse(data);

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    return new Response (JSON.stringify({ error: 'Unable to read entries'}), { 
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const newEntry = await req.json(); // Get the new entry from the request body

    const data = await fs.readFile(dataFilePath, 'utf-8');

    const entries = JSON.parse(data);

    if (newEntry.id) {
      const index = entries.findIndex(entry => entry.id === newEntry.id);
      if (index !== -1) {
        entries[index] = newEntry
      }
    } else {
      newEntry.id = entries.length + 1;
      entries.push(newEntry);
    }

    // Write the updated entries back to the data file
    await fs.writeFile(dataFilePath, JSON.stringify(entries, null, 2));

    return new Response(JSON.stringify(newEntry), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Unable to save entry'
    }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updatedData } = await request.json();

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const entries = JSON.parse(data);

    // const { id, ...updatedData } = await request.json();

    const updatedEntries = entries.map(entry =>
       entry.id === id ? { ...entry, ...updatedData } : entry
    );

    await fs.writeFile(dataFilePath, JSON.stringify(updatedEntries, null, 2));

    return new Response(JSON.stringify({
      message: 'Entry updated successfully',
      success: true
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Unable to update entries'
    }), {
      status: 500,
    });
  }
}

// export async function PUT(request) {
//   try {
//     const data = fs.readFileSync(dataFilePath, 'utf-8');

//     const { id, ...updatedData } = await request.json();

//     const updatedEntry = await Entry.findByIdAndUpdate(id, updatedData, { new: true });

//     return new Response(JSON.stringify({
//       message: 'Entry updated successfully',
//       success: true,
//       data: updatedEntry 
//     }), { status: 201 });

//   } catch (error) {
//     return new Response(JSON.stringify({
//       error: 'Unable to change entries'
//     }), {
//       status: 500,
//     });
//   }
// }


// // function to handle the API route
// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // Read the file and send the data as JSON
//     const data = fs.readFileSync(dataFilePath, 'utf-8');
//     res.status(200).json(JSON.parse(data));
//   } else if (req.method === 'POST') {
//     // Get the new entry from the request body
//     const newEntry = req.body;

//     // Read the current data
//     const data = fs.readFileSync(dataFilePath, 'utf-8');
//     const entries = JSON.parse(data);

//     // Add the new entry
//     entries.push(newEntry);

//     // Save the updated data back to the file
//     fs.writeFileSync(dataFilePath, JSON.stringify(entries, null, 2));

//     res.status(200).json({ message: 'Entry added successfully' })
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

//===============
// // for db
// export async function GET(request) {
//   await dbConnect();
//   const entries = await Entry.find({});
//   return new Response(JSON.stringify({ success: true, data: entries }), { status: 200 });
// }

// export async function POST(request) {
//   await dbConnect();
//   const body = await request.json();
//   const entry = await Entry.create(body);
//   return new Response(JSON.stringify({ success: true, data: entry }), { status: 201 });
// }

// export async function PUT(request) {
//   await dbConnect();
//   const { id, ...updateData } = await request.json();
//   const updatedEntry = await Entry.findByIdAndUpdate(id, updateData, { new: true });
//   return new Response(JSON.stringify({ success: true, data: updatedEntry }), { status: 200 });
// }
//==============

