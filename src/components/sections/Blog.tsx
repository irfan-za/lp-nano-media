"use client";

import { blogPosts } from "~/data/blogPosts";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";

export function Blog() {
  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface" id="blog">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Your time is valuable. We do the reading so you don't have to."
          description="Data-backed insights, industry trends, and practical playbooks from our team of 140+ digital specialists."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-md"
            >
              {/* Gradient thumbnail */}
              <div
                className={`h-44 rounded-t-2xl bg-gradient-to-br ${post.gradient}`}
              />
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="font-medium text-brand-500">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-gray-900 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-brand-500 transition-colors group-hover:text-brand-600">
                  Read More
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
